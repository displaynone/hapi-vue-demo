// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		ecmaVersion: 2018,
	},
	env: {
		amd: true,
		node: true
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: [
		'plugin:vue/recommended',
	],
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		"array-bracket-spacing": [ "error", "always" ],
		"brace-style": [ "error", "1tbs" ],
		"camelcase": [ "error", { "properties": "never" } ],
		"comma-dangle": [ "error", "always-multiline" ],
		"comma-spacing": "error",
		"comma-style": "error",
		"computed-property-spacing": [ "error", "always" ],
		"constructor-super": "error",
		"dot-notation": "error",
		"eol-last": "error",
		"eqeqeq": "error",
		"func-call-spacing": "error",
		"indent": [ "error", "tab", { "SwitchCase": 1 } ],
		"key-spacing": "error",
		"keyword-spacing": "error",
		"lines-around-comment": "off",
		"no-alert": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-console": "error",
		"no-const-assign": "error",
		"no-debugger": "error",
		"no-dupe-args": "error",
		"no-dupe-class-members": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-else-return": "error",
		"no-eval": "error",
		"no-extra-semi": "error",
		"no-fallthrough": "error",
		"no-lonely-if": "error",
		"no-mixed-operators": "error",
		"no-mixed-spaces-and-tabs": "error",
		"no-multiple-empty-lines": [ "error", { "max": 1 } ],
		"no-multi-spaces": "error",
		"no-multi-str": "off",
		"no-negated-in-lhs": "error",
		"no-nested-ternary": "error",
		"no-redeclare": "error",
		"no-shadow": "error",
		"no-undef": "error",
		"no-undef-init": "error",
		"no-unreachable": "error",
		"no-unsafe-negation": "error",
		"no-unused-expressions": "error",
		"no-unused-vars": "error",
		"no-useless-computed-key": "error",
		"no-useless-constructor": "error",
		"no-useless-return": "error",
		"no-var": "error",
		"no-whitespace-before-property": "error",
		"object-curly-spacing": [ "error", "always" ],
		"padded-blocks": [ "error", "never" ],
		"prefer-const": "error",
		"quote-props": [ "error", "as-needed" ],
		"semi": "error",
		"semi-spacing": "error",
		"space-before-blocks": [ "error", "always" ],
		"space-before-function-paren": [ "error", "never" ],
		"space-in-parens": [ "error", "always" ],
		"space-infix-ops": [ "error", { "int32Hint": false } ],
		"space-unary-ops": [ "error", {
			"overrides": {
				"!": true
			}
		} ],
		"template-curly-spacing": [ "error", "always" ],
		"valid-jsdoc": [ "error", {
		"requireReturn": false,
		"requireReturnDescription": false,
		"requireParamDescription": false
		} ],
		"valid-typeof": "error",
		"yoda": "off",
		"vue/script-indent": ["error", "tab", {
			"baseIndent": 0,
			"switchCase": 0,
			"ignores": []
		} ],
		"vue/html-indent": ["error", 'tab', {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
			"ignores": []
		}]
	},
	"globals": {
		"Promise": "readonly"
	}
}
