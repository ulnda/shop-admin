require('./news-list.scss');

import endlessScroll from 'components/endless-scroll';

import NewsList from './news-list';

export default endlessScroll({ scrollThreshold: 150 })(NewsList);
