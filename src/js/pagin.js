import Pagination from 'tui-pagination';

const options = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 2,
  template: {
    page: '<button type="button" class="tui-page-btn">{{page}}</button>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<button type="button" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</button>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<button type="button" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</button>',
  },
};
  const windowWidth = Math.round(window.visualViewport.width);

  if (windowWidth > 760) {
    options.visiblePages = 3;
  }
  export const pagination = new Pagination('pagination', options);
