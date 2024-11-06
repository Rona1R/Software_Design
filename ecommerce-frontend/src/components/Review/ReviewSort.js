import Dropdown from "react-bootstrap/Dropdown";
import "./SingleReview/Review.css";
export default function ReviewSort(props) {

    const selectSort=(sortOrder)=>{
        props.handleSortFunc(sortOrder);
    };

  return (
    <Dropdown id="SortRating">
      <Dropdown.Toggle style={{backgroundColor:"#000004"}}>
        <span><b>SORT: </b>{props.selectedOrder}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => selectSort("Most Recent")}>
          Most Recent
        </Dropdown.Item>
        <Dropdown.Item onClick={() => selectSort("Oldest")}>
          Oldest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => selectSort("Highest Rating")}>
          Highest Rating
        </Dropdown.Item>
        <Dropdown.Item onClick={() => selectSort("Lowest Rating")}>
          Lowest Rating
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
