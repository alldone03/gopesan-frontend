



export default function Label(props: any) {

    const { htmlFor, children } = props;
    return (<>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {children}
        </label>
    </>);
}