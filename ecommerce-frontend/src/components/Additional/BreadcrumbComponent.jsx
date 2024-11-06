
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import "./BreadCrumbComponent.css";

function BreadcrumbComponent({path}) {
    // const location = useLocation();
    // const pathnames = location.pathname.split('/').filter(x => x);
    const navigimi = (pageType,id)=>{
      switch(pageType) {
        case "category":
          return `/Products/Category/${id[0]}`;
        case "subcategory":
          return `/Products/Category/${id[0]}/SubCategory/${id[1]}`;
        case "company":
          return `/Products/Company/${id[0]}`;
        case "orders":
          return "/MyOrder";
        default:
          return "/";
      }
    };
  
  
    return (
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}
        className='breadcrumb'
        >
          Home
        </Breadcrumb.Item>

        {
          path.map((page,index)=>
          {
            const to = navigimi(page.pageType, page.id);

            return index+1 === path.length ? (
            <Breadcrumb.Item active key={index}
            className='breadcrumb'
            >
              {page.emri}
            </Breadcrumb.Item>
            ):(
            
            
            <Breadcrumb.Item linkAs={Link} linkProps={{to}} key={index}
            className='breadcrumb'
            >
              {
              page.emri
              }
            </Breadcrumb.Item>


            );
          
          })
        }
      </Breadcrumb>
    );
}

export default BreadcrumbComponent;