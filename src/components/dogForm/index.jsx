import React from 'react';
import PropTypes from 'prop-types';
import DogFormParam from '../dogFormParam';

import {
  StyledDogForm,
  StyledDogFormImage,
  StyledDogFormData,
  StyledDogFormButton,
} from './styles.js';

const DogForm = ({
  dogData,
  isEditing,
  fields,
  dictionaries,
  onDataChange,
  onButtonClick,
  onSubmit,
}) => {
  const handleChange = ({ target: { name, value } }) => onDataChange({
    fieldName: name,
    fieldValue: value,
  });

  const onCancelClick = () => onButtonClick({ id: 'cancel' });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(dogData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledDogForm>
        <StyledDogFormImage/>
        
        <StyledDogFormData>
            {
              fields.map(({ id: fieldId, text: fieldLabel, type: fieldType }, index) => 
                <DogFormParam
                  key={index}
                  isEditing={isEditing}
                  fieldId={fieldId} 
                  label={fieldLabel}
                  value={dogData[fieldId]}
                  type={fieldType}
                  options={dictionaries[fieldId]}
                  onChange={handleChange}
                />
              )
            }
        </StyledDogFormData>
      </StyledDogForm>

      {
        isEditing &&
          <>
            <StyledDogFormButton onClick={onCancelClick}>Отменить</StyledDogFormButton>
            <StyledDogFormButton type="submit">Сохранить</StyledDogFormButton>
          </>
      }
    </form>

  );
};

DogForm.propTypes = {
  dogData: PropTypes.object,
  isEditing: PropTypes.bool,
  fields: PropTypes.array,
  dictionaries: PropTypes.object,
  onDataChange: PropTypes.func,
  onButtonClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DogForm;