module.exports = {
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', '@types'],
			},
			typescript: {},
		},
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'prettier',
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
	},
	ignorePatterns: ['.eslintrc.js'],
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-restricted-syntax': ['error', 'FunctionExpression', 'WithStatement', "BinaryExpression[operator='in']"],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
	},
};
