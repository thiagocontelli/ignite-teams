import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumberOfPlayers } from './style';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersgetByGroup } from '@storage/player/playersGetByGroup';

type RouteParams = {
	group: string;
};

export function Players() {
	const [newPlayerName, setNewPlayerName] = useState('');

	const [team, setTeam] = useState('Time A');
	const [players, setPlayers] = useState([]);

	const route = useRoute();
	const { group } = route.params as RouteParams;

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
			const players = await playersgetByGroup(group);
			console.log(players);
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

	return (
		<Container>
			<Header showBackButton />

			<Highlight title={group} subtitle="Adicione a galera e separe os times" />

			<Form>
				<Input
					placeholder="Nome da pessoa"
					autoCorrect={false}
					onChangeText={setNewPlayerName}
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
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<PlayerCard name={item} onRemove={() => {}} />
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

			<Button title="Remover Turma" type="SECONDARY" />
		</Container>
	);
}
