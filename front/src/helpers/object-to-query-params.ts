type Props = {
	[key: string]: string | number | undefined | null;
};

export const objectToQueryParams = (object: Props) => {
	const params = Object.entries(object)
		.filter(([, value]) => value !== undefined && value !== null)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
		);

	return params.length > 0 ? `?${params.join('&')}` : '';
};
