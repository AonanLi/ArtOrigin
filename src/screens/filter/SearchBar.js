import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';

const SearchBar = ({ onChange, reset, keyword }) => (
    <Header searchBar rounded>
        <Item>
            <Icon name="ios-search" />
            <Input
                placeholder="Search"
                value={keyword}
                onChangeText={text => onChange('keyword', text)}
            />
        </Item>
        <Button transparent onPress={reset}>
            <Text>Reset</Text>
        </Button>
    </Header>
);

export default SearchBar;
