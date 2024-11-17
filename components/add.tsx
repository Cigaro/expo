import { addItem } from '@/assets/reqests';
import { Button, Flex, Input } from 'antd';
import { useState } from 'react';

export interface Render {
  render: () => void;
}

export const AddItem = ({ render }: Render) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const HideButton = () => {
    if (!show) {
      return 'none';
    }
    return 'block';
  };

  const newItem = (value: string, status: boolean) => {
    const id = `${Math.floor(Math.random() * 100)}wsjfh`;
    addItem('/add', id, value, status).then((response) => {
      render();
    });
  };

  return (
    <Flex>
      <Flex style={{ width: '100%' }} justify='flex-end'>
        {!show ? (
          <Button
            type='primary'
            onClick={() => {
              setShow(!show);
            }}
          >
            Add new
          </Button>
        ) : (
          <></>
        )}
      </Flex>
      {show ? (
        <Flex style={{ width: '100%', marginTop: '20px' }}>
          <Input
            style={{ width: '100%', marginRight: '25px', marginLeft: '10px' }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            type='primary'
            onClick={() => {
              newItem(value, false);
              setValue('');
              setShow(false);
              HideButton();
            }}
          >
            Add
          </Button>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
