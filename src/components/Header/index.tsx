import { BackButton, BackIcon, Container, Logo } from './style';
import logoImg from '@assets/logo.png';

type Props = {
	showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
	return (
		<Container>
			{showBackButton && (
				<BackButton>
					<BackIcon />
				</BackButton>
			)}
			<Logo source={logoImg}></Logo>
		</Container>
	);
}
