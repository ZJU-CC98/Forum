import * as React from 'react';
import { ITopic } from '@cc98/api';
import Item from './PostItem';

interface Props {
  list: ITopic[];
}
const List: React.SFC<Props> = ({ list }) => (
  <div className="board-list-body" >
    {list.map((item, index) => (
      <Item key={index} order={index} data={item} />
    ))}
  </div>
);
export default List;
