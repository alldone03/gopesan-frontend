import Input from "./Input";
import Label from "./Label";




const Form = ({ title, name, placeholder }: any) => {
    // const { title, name, placeholder } = props;
    return (
        <>
            <Label htmlFor={name}>{title}</Label>
            <div className="h-2"></div>
            <Input name={name} placeholder={placeholder} />
        </>
    );
};

export default Form;