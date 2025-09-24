import { useState } from "react";
import { validateProductName, validateProductPrice, validateProductDescription, validateProductImage } from "../../shared/validators";
import { Input } from "../Input";

const inputs = [
    {
        field: 'name',
        label: 'Product Name',
        validationMessage: 'Please enter a valid product name.',
        type: 'text'
    },
    {
        field: 'description',
        label: 'Product Description',
        validationMessage: 'Please enter a valid description.',
        type: 'text'
    },
    {
        field: 'price',
        label: 'Product Price',
        validationMessage: 'Please enter a valid price.',
        type: 'number'
    },
    {
        field: 'stock',
        label: 'Product Stock',
        validationMessage: 'Please enter a valid stock amount.',
        type: 'number'
    },
    {
        field: 'category',
        label: 'Product Category',
        validationMessage: 'Please enter a valid category.',
        type: 'text'
    },
    {
        field: 'image',
        label: 'Product Image URL',
        validationMessage: 'Please enter a valid image URL.',
        type: 'text'
    }
]

export const ProductSettings = ({product, saveProductSettings}) => {

    const [formState, setFormState] = useState({
        name: {
            isValid: validateProductName(product.name),
            showError: false,
            value: product.name
        },
        description: {
            isValid: validateProductDescription(product.description),
            showError: false,
            value: product.description
        },
        price: {
            isValid: validateProductPrice(product.price),
            showError: false,
            value: product.price
        },
        stock: {
            isValid: true,
            showError: false,
            value: product.stock
        },
        category: {
            isValid: true,
            showError: false,
            value: product.category
        },
        image: {
            isValid: validateProductImage(product.image),
            showError: false,
            value: product.image
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'name':
                isValid = validateProductName(value);
                break;
            case 'description':
                isValid = validateProductDescription(value);
                break;
            case 'price':
                isValid = validateProductPrice(value);
                break;
            case 'stock':
                isValid = value >= 0; // Basic check for stock
                break;
            case 'category':
                isValid = true;
                break;
            case 'image':
                isValid = validateProductImage(value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        saveProductSettings({
            name: formState.name.value,
            description: formState.description.value,
            price: formState.price.value,
            stock: formState.stock.value,
            categoria: formState.category.value,
            image: formState.image.value
        });
    };

    const isSubmitButtonDisabled = !formState.name.isValid || !formState.description.isValid || !formState.price.isValid || !formState.stock.isValid || !formState.image.isValid;

    return (
        <form className="settings-form">
            {inputs.map((input) => (
                <Input
                    key={input.field}
                    field={input.field}
                    label={input.label}
                    value={formState[input.field].value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState[input.field].showError}
                    validationMessage={input.validationMessage}
                    type={input.type}
                />
            ))}

            <button disabled={isSubmitButtonDisabled} onClick={handleFormSubmit}>Update Product</button>
        </form>
    );
};
