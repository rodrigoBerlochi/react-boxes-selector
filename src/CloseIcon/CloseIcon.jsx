import React from 'react';
import { func, number, string } from 'prop-types';
import styled from 'styled-components';
import { Semantics } from '../theme.styles';

const CloseButtonIcon = {
    enabled: `data:image/svg+xml;base64,  PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJEaWFsb2d1ZUNsb3NlWCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxNHB4IiBoZWlnaHQ9IjE0cHgiIHZpZXdCb3g9IjAgMCAxNCAxNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQgMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggaWQ9IlgiIHN0eWxlPSJmaWxsOiM2NjY2NjY7IiBkPSJNNy43LDdsNC43LTQuN2MwLjItMC4yLDAuMi0wLjUsMC0wLjdzLTAuNS0wLjItMC43LDBMNyw2LjNMMi4zLDEuNmMtMC4yLTAuMi0wLjUtMC4yLTAuNywwICBzLTAuMiwwLjUsMCwwLjdMNi4zLDdsLTQuNyw0LjdjLTAuMiwwLjItMC4yLDAuNSwwLDAuN3MwLjUsMC4yLDAuNywwTDcsNy43bDQuNyw0LjdjMC4yLDAuMiwwLjUsMC4yLDAuNywwczAuMi0wLjUsMC0wLjdMNy43LDd6Ii8+Cjwvc3ZnPg==`,
    active: `data:image/svg+xml;base64,  PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJEaWFsb2d1ZUNsb3NlWCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxNHB4IiBoZWlnaHQ9IjE0cHgiIHZpZXdCb3g9IjAgMCAxNCAxNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQgMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggaWQ9IlgiIHN0eWxlPSJmaWxsOiMzMzMzMzM7IiBkPSJNNy43LDdsNC43LTQuN2MwLjItMC4yLDAuMi0wLjUsMC0wLjdzLTAuNS0wLjItMC43LDBMNyw2LjNMMi4zLDEuNmMtMC4yLTAuMi0wLjUtMC4yLTAuNywwICBzLTAuMiwwLjUsMCwwLjdMNi4zLDdsLTQuNyw0LjdjLTAuMiwwLjItMC4yLDAuNSwwLDAuN3MwLjUsMC4yLDAuNywwTDcsNy43bDQuNyw0LjdjMC4yLDAuMiwwLjUsMC4yLDAuNywwczAuMi0wLjUsMC0wLjdMNy43LDd6Ii8+Cjwvc3ZnPg==`
};

const Img = styled.img`{
    opacity: ${Semantics.Elements.Transparent};
    &:hover{
        opacity: 1;
    }
}`;

export const CloseIcon = ({ 
    handleClick, 
    size, 
    id 
}) => {
    const styles = {
        close: {
            display: 'inline-block',
            width: size,
            height: size,
            float: 'right',
            textAlign: 'center'
        }
    };
    
    const iconSize = size - (Math.floor(size / 3));

    return (
        <span 
            style={styles.close} 
            id={id} 
            onClick={(event) => {
                const val = event.target.id || event.target.parentNode.id;
                handleClick(val);
            }}
        >
            <Img 
                style={{ width: iconSize, height: iconSize }}
                src={CloseButtonIcon.enabled}
            />
        </span>
    );
};

CloseIcon.propTypes = {
    handleClick: func,
    size: number,
    id: string.isRequired,
};

CloseIcon.defaultProps = {
    handleClick: () => {},
    size: 18,
};
