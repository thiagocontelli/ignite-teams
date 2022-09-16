import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container, Content, Icon } from './style';

export function NewGroup() {
	return (
		<Container>
			<Header showBackButton />

			<Content>
				<Icon />
				<Highlight
					title="Nova Turma"
					subtitle="Crie a turma para adicionar as pessoas"
				/>
				<Button title="Criar" />
			</Content>
		</Container>
	);
}
