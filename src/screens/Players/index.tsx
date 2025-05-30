import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { AppError } from '@utils/AppError';

import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeams';

import { Container, Form, HeaderList, NumberOfPlayers } from './style';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
	group: string;
};

export function Players() {
	const [newPlayerName, setNewPlayerName] = useState('');

	const [team, setTeam] = useState('Time A');
	const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

	const navigation = useNavigation();

	const route = useRoute();
	const { group } = route.params as RouteParams;

	const newPlayerNameInputRef = useRef<TextInput>(null);

	async function handleAddPlayer() {
		if (newPlayerName.trim().length === 0) {
			return Alert.alert(
				'Nova pessoa',
				'Insira um nome para adicionar uma nova pessoa.'
			);
		}

		const newPlayer = {
			name: newPlayerName,
			team,
		};

		try {
			await playerAddByGroup(newPlayer, group);
			// const players = await playersGetByGroup(group);
			newPlayerNameInputRef.current?.blur();
			setNewPlayerName('');
			fetchPlayersByTeam();
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert('Nova pessoa', error.message);
			} else {
				console.log(error);
				Alert.alert(
					'Nova pessoa',
					'Não foi possível adicionar uma nova pessoa.'
				);
			}
		}
	}

	async function fetchPlayersByTeam() {
		try {
			const playersByTeam = await playersGetByGroupAndTeam(group, team);

			setPlayers(playersByTeam);
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Pessoas',
				'Não foi possível carregar as pessoas do time selecionado.'
			);
		}
	}

	async function handleRemovePlayer(playerName: string) {
		try {
			await playerRemoveByGroup(playerName, group);
			fetchPlayersByTeam();
		} catch (error) {
			console.log(error);
			Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
		}
	}

	async function groupRemove() {
		try {
			await groupRemoveByName(group);
			navigation.navigate('groups');
		} catch (error) {
			console.log(error);
			Alert.alert('Remover grupo', 'Não foi possível remover o grupo.');
		}
	}

	async function handleGroupRemove() {
		Alert.alert('Remover', 'Deseja remover o grupo?', [
			{ text: 'Não', style: 'cancel' },
			{ text: 'Sim', onPress: () => groupRemove() },
		]);
	}

	useEffect(() => {
		fetchPlayersByTeam();
	}, [team]);

	return (
		<Container>
			<Header showBackButton />

			<Highlight title={group} subtitle="Adicione a galera e separe os times" />

			<Form>
				<Input
					placeholder="Nome da pessoa"
					autoCorrect={false}
					onChangeText={setNewPlayerName}
					value={newPlayerName}
					inputRef={newPlayerNameInputRef}
					onSubmitEditing={handleAddPlayer}
					returnKeyType="done"
				/>

				<ButtonIcon icon="add" onPress={handleAddPlayer} />
			</Form>

			<HeaderList>
				<FlatList
					data={['Time A', 'Time B']}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === team}
							onPress={() => setTeam(item)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
				<NumberOfPlayers>{players.length}</NumberOfPlayers>
			</HeaderList>

			<FlatList
				data={players}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => (
					<PlayerCard
						name={item.name}
						onRemove={() => handleRemovePlayer(item.name)}
					/>
				)}
				ListEmptyComponent={() => (
					<ListEmpty message="Não há pessoas nesse time" />
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{ paddingBottom: 80 },
					players.length === 0 && { flex: 1 },
				]}
			/>

			<Button
				title="Remover Turma"
				type="SECONDARY"
				onPress={handleGroupRemove}
			/>
		</Container>
	);
}
