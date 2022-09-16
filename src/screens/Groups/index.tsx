import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';

export function Groups() {
	const [groups, setGroups] = useState([]);

	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate('new');
	}

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
