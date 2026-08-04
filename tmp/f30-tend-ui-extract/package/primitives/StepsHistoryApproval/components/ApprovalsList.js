import React, { useState, useCallback } from 'react';
import { Box } from '@10d/tend-ui-grid';
import { ApprovalUser } from './ApprovalUser.js';
import { StyledButton } from './styled.js';

const ApprovalsList = ({ list = [], showAvatar, maxVisibleItems = 4, }) => {
    const [showAll, setShowAll] = useState(false);
    const showMore = useCallback(() => {
        setShowAll(true);
    }, []);
    return (React.createElement(Box, null,
        list.slice(0, showAll ? list.length : maxVisibleItems).map(item => (React.createElement(ApprovalUser, { key: item.user.id, step: item, showAvatar: showAvatar }))),
        !showAll && list.length > maxVisibleItems && (React.createElement(StyledButton, { ml: -16, variant: 'link', onClick: showMore },
            "\u0415\u0449\u0435 ",
            list.length - maxVisibleItems))));
};

export { ApprovalsList };
