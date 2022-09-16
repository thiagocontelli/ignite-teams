import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AppRoutes } from './app.routes';

export function Routes() {
	const { COLORS } = useTheme();
	return (
		<View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
			{' '}
			// PARA EVITAR GLITCH BRANCO NA NAVEGAÇÃO
			<NavigationContainer>
				<AppRoutes />
			</NavigationContainer>
		</View>
	);
}
