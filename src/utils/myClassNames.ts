import classNames from 'classnames/bind';

type CssProperty = { readonly [key: string]: string }

const myClassNames = (styles: CssProperty) => {
    return classNames.bind(styles)
}

export default myClassNames;