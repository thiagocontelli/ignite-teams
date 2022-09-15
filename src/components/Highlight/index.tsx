import { Container, Subitle, Title } from './style';

type Props = {
  title: string
  subtitle: string
}

export function Highlight({title, subtitle}: Props) {
	return (
		<Container>
			<Title>{title}</Title>
			<Subitle>{subtitle}</Subitle>
		</Container>
	);
}
