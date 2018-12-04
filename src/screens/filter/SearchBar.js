import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import i18n from 'i18n-js';

const SearchBar = ({ onChange, reset, keyword }) => (
    <Header searchBar rounded>
        <Item>
            <Icon name="ios-search" />
            <Input
                placeholder={i18n.t('Search')}
                value={keyword}
                onChangeText={text => onChange('keyword', text)}
            />
        </Item>
        <Button transparent onPress={reset}>
            <Text>{i18n.t('Reset')}</Text>
        </Button>
    </Header>
);

export default SearchBar;
