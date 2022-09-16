import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
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
        <Input />
				<Button title="Criar" style={{marginTop: 20}} />
			</Content>
		</Container>
	);
}
