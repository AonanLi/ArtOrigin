import React from 'react';

const ShowIf = ({ condition, children }) => (condition ? children : false);

export default ShowIf;
