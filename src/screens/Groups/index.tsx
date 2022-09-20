import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
	const [groups, setGroups] = useState([]);

	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate('new');
	}

	async function fetchGroups() {
		try {
			const data = await groupsGetAll();

			setGroups(data);
		} catch (error) {
			console.log(error);
		}
	}

	useFocusEffect(
		useCallback(() => {
			console.log('useFocusEffect executou');
			fetchGroups();
		}, [])
	);

	return (
		<Container>
			<Header />
			<Highlight title="Turmas" subtitle="Jogue com a sua turma" />
			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <GroupCard title={item} />}
				ListEmptyComponent={() => (
					<ListEmpty message="Que tal cadastrar a primeira turma?" />
				)}
				contentContainerStyle={groups.length === 0 && { flex: 1 }}
				showsVerticalScrollIndicator={false}
			/>
			<Button title="Criar nova turma" onPress={handleNewGroup} />
		</Container>
	);
}
