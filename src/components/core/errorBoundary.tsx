/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

interface IErrorBoundaryProps {
	readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
	readonly error: any;
	readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
	readonly state: IErrorBoundaryState = { error: undefined, errorInfo: undefined };

	componentDidCatch(error: any, errorInfo: any): void {
		this.setState({
			error,
			errorInfo,
		});
	}

	render(): (JSX.Element | JSX.Element[]) & React.ReactNode {
		const { error, errorInfo } = this.state;
		const { children } = this.props;
		if (errorInfo) {
			const errorDetails =
				process.env.NODE_ENV === 'development' ? (
					<details className="preserve-space">
						{error && error.toString()}
						<br />
						{errorInfo.componentStack}
					</details>
				) : undefined;
			return (
				<div>
					<h2 className="error">An unexpected error has occurred.</h2>
					{errorDetails}
				</div>
			);
		}
		return children;
	}
}

export default ErrorBoundary;
