import React from 'react'
import MyInput from '../BasicComponents/MyInput'
import Button from '../BasicComponents/Button'
import Toggle from '../BasicComponents/Toggle'
import { useState } from'react'

function InputSection() {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        try {
          // Set the text to display the input value
          setText(inputValue);
    
          // Save to the server (Supabase example)
          const { data, error } = await supabase
          .from('study_questions') // Replace 'study_questions' with your actual table name
          .insert([
            { question: inputValue, project_id: project.id } // Include the foreign key (project_id)
          ]);
    
          if (error) {
            console.error('Error saving data:', error.message);
            alert('데이터 저장 중 오류가 발생했습니다.');
          } else {
            console.log('Data saved successfully:', data);
            alert('데이터가 성공적으로 저장되었습니다.');
          }
        } catch (error) {
          console.error('Unexpected error:', error.message);
        }
    
        // Clear the input field
        setInputValue('');
      };


  return (
    <div style={{
        position: 'absolute',  // 절대 위치로 설정
        bottom: '20px',        // 화면 하단에서 20px 떨어지게 위치 지정
        width: '100%',         // 전체 너비 사용
        padding: '0 20px'      // 입력창과 대화모드 간의 간격을 추가
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{display:'flex',flexDirection:'column'}}>
              <MyInput
              value={inputValue}
              onChange={handleInputChange}
              placeholder=""
              />
              <Button title='입력' onClick={handleSubmit}/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ fontSize: '16px' }}>대화모드</div>
            <Toggle />
          </div>
        </div>
      </div>
  )
}

export default InputSection
