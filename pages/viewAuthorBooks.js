import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

const viewAuthorBooks = (obj) => {
  clearDom();

  let domString = `
  <div class="mt-5 d-flex flex-wrap">
  <div class="d-flex flex-column">
   <h1> ${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h1>
   Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
  </div>;`;

  obj.booksArray.map((item) => {
    domString += `<div class="text-white ms-5 details">
      <h5>${item.title}  ${item.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
      <p>${item.description || ''}</p>
      <hr>
      <p>${item.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span>
        $${item.price}` : `$${item.price}`}</p>
       </div>
       </div>`;
    return renderToDOM('#view', domString);
  });
};

export default viewAuthorBooks;
