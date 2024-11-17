import { deleteItem, updateItem } from '@/assets/reqests';
import { Flex, Input, Checkbox, CheckboxProps, Button } from 'antd';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type Props = {
  render: () => void;
  value: string;
  status: boolean;
  _id?: string;
};

const ToDoItem = (props: Props) => {
  const RemoveItem = (id: string) => {
    deleteItem('/delete', id).then((response) => {
      props.render();
    });
  };

  const UpdateItem = (id: string, value: string, status: boolean) => {
    updateItem('/update', id, value, status).then((response) => {
      props.render();
    });
  };

  const Color = () => {
    if (props.status) {
      return '#b7eb8f';
    }
    return '#bae7ff';
  };

  const Text = () => {
    if (props.status) {
      return 'Done';
    }
    return 'In progress';
  };
  const [disable, setDisable] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState(Text());
  const [color, setColor] = useState(Color());
  const [status, setStatus] = useState(props.status);
  const [updateText, setUpdateText] = useState(props.value);
  const id = props._id as string;

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setText('Done');
      setColor('#b7eb8f');
      setStatus(true);
      return;
    }

    setText('In progress');
    setColor('#bae7ff');
    setStatus(false);
    return;
  };
  return (
    <Flex
      vertical
      style={{
        width: '100%',
        backgroundColor: `${color}`,
        padding: '5px',
        borderRadius: '6px',
        marginTop: '15px',
      }}
      color={'gray-5'}
    >
      <Flex align='center' justify='center' style={{ width: '100%' }}>
        <Input
          disabled={disable}
          style={{ width: '100%' }}
          defaultValue={props.value}
          onChange={(e) => {
            setUpdateText(e.currentTarget.value);
          }}
        />
        <Flex style={{ marginLeft: '15px' }}>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => {
              setToggle(!toggle);
              setDisable(!disable);
            }}
            disabled={!disable}
          />
          <Button
            type='primary'
            color='danger'
            variant='solid'
            icon={<DeleteOutlined />}
            onClick={() => RemoveItem(id)}
            style={{ marginLeft: '10px' }}
          />
        </Flex>
      </Flex>
      {toggle ? (
        <Flex align='center' justify='space-between' style={{ width: '100%' }}>
          <Checkbox onChange={onChange} checked={status}>
            {text}
          </Checkbox>
          <Button
            type='primary'
            style={{ minWidth: '23%', marginTop: '5px' }}
            onClick={() => {
              UpdateItem(id, updateText, status);
              setToggle(!toggle);
              setDisable(!disable);
            }}
          >
            Done
          </Button>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({});

export default ToDoItem;
