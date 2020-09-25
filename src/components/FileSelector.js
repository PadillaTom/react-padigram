import React from 'react';

function FileSelector({ handleChange }) {
  const hiddenFileInput = React.useRef(null);

  const handleFileUpload = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <React.Fragment>
      <div className='upload-image-btn' onClick={handleFileUpload}>
        <i class='fas fa-camera-retro'></i>
      </div>

      <input
        ref={hiddenFileInput}
        type='file'
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </React.Fragment>
  );
}

export default FileSelector;
