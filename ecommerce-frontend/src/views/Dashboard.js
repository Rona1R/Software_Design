import React, { useState, useEffect } from "react";
// import ChartistGraph from "react-chartist";
// react-bootstrap components
//import "../api/axiosConfig";
import ShitjetStatistika from "components/DashboardComponents/ShitjetStatistika/ShitjetStatistika";
import {
  faSackDollar,
  faShoppingBag,
  faBox,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KategoriteStatistika from "components/DashboardComponents/KategoriteStatistika/KategoriteStatistika";
import "components/DashboardComponents/DashboardStyles/Dashboard.css";
import RevenueMujore from "components/DashboardComponents/RevenueMujoreStatistika/RevenueMujore";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditTeDhenatBiznesit from "components/DashboardComponents/CRUD/TeDhenatBiznesitCRUD/EditTeDhenatBiznesit";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [shifrat, setShifrat] = useState(null);
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState(null);
  const [refreshKey,setRefreshKey] = useState('');
  const [shfaqEdit,setShfaqEdit] = useState(false);
  const [teDhenatBiznesitLoading, setTeDhenatBiznesitLoading] = useState(true);
  const useri  = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [biznesData, shifraData] = await Promise.all([
          axios.get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat"),
          axios.get("https://localhost:7061/api/Statistika/getShifrat")
        ]);
        console.log("Dashboard details fetched !");

        if(biznesData && biznesData.status === 200) {
          setTeDhenatBiznesit(biznesData.data);
          setTeDhenatBiznesitLoading(false);
        }

        if(shifraData && shifraData.status === 200) {
          setShifrat(shifraData.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
}, [refreshKey]);



  // useEffect(() => {
  //   const fetchData = async ()=> {
  //     try {
  //       await axios
  //       .get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat")
  //       .then((response) => {
  //         if(response && response.status === 200)
  //           {
  //             setTeDhenatBiznesit(response.data);
  //             setTeDhenatBiznesitLoading(false);
  //           }
  //         });

  //         await axios
  //         .get("https://localhost:7061/api/Statistika/getShifrat")
  //         .then((response) => {
  //           if(response && response.status === 200){
  //             setShifrat(response.data);
  //             setLoading(false);
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //    }

  //   fetchData();     
  // }, [refreshKey]);

  // useEffect(() => {
  //   const fetchData = async ()=>{
  //     try {
  //       await axios
  //         .get("https://localhost:7061/api/Statistika/getShifrat")
  //         .then((response) => {
  //           if(response && response.status === 200){
  //             setShifrat(response.data);
  //             setLoading(false);
  //           }
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      {
        shfaqEdit && (
          <EditTeDhenatBiznesit 
            mbyllEdit = {()=>setShfaqEdit(false)}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }
      <Container fluid>
        <Row className="business-data-container">
          <Col>
            {teDhenatBiznesitLoading? (
              <div className="loading">
                <TailSpin
                  height="200"
                  width="80"
                  color="#322b9c"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <>
               {
                useri && useri.roles.includes("Admin") && (
                <div className="business-edit-button">
                  <Button
                    sx={{
                      backgroundColor: "inherit",
                      "&:hover": { backgroundColor: "inherit" },
                      padding: 0,
                      minWidth: "auto",
                    }}
                    onClick={()=>setShfaqEdit(true)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{
                        color: "#000004",
                        fontSize: "23px",
                        marginRight: "15px",
                      }}
                    />
                  </Button>
                </div>
                )
               }
                <div>
                  <p className="business-data-title">Te dhenat e biznesit</p>
                  <p className="business-data-item">
                    <strong>Emri:</strong> {teDhenatBiznesit.emriBiznesit}
                  </p>
                  <p className="business-data-item">
                    <strong>Email:</strong> {teDhenatBiznesit.emailBiznesit}
                  </p>
                  <p className="business-data-item">
                    <strong>Numri i telefonit:</strong> + {teDhenatBiznesit.nrKontaktues}
                  </p>
                  <p className="business-data-item">
                    <strong>Instagram Link: </strong> 
                    <a href={teDhenatBiznesit.instagramLink}>
                    {teDhenatBiznesit.instagramLink}
                    </a>
                  </p>
                  <p className="business-data-item">
                    <strong>Twitter Link: </strong> 
                    <a href={teDhenatBiznesit.twitterLink}>
                     {teDhenatBiznesit.twitterLink}
                    </a>
                  </p>
                  <p className="business-data-item">
                    <strong>LinkedIn Link: </strong> 
                    <a href={teDhenatBiznesit.linkedInLink}>
                     {teDhenatBiznesit.linkedInLink}
                    </a>
                  </p>
                  <p className="business-data-item">
                    <strong>Facebook Link: </strong> 
                    <a href={teDhenatBiznesit.facebookLink}>
                     {teDhenatBiznesit.facebookLink}
                    </a>
                  </p>
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row>
          {loading ? (
            <div className="loading">
              <TailSpin
                height="80"
                width="80"
                color="#322b9c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <FontAwesomeIcon
                            icon={faPerson}
                            style={{ height: "50px" }}
                          />
                          {/* <i className="nc-icon nc-chart text-warning"></i> */}
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Costumers</p>
                          <Card.Title as="h4">{shifrat.nrKlienteve}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Current
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <FontAwesomeIcon
                            icon={faSackDollar}
                            style={{ height: "50px", color: "#043409" }}
                          />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Revenue</p>
                          <Card.Title as="h4"> {shifrat.revenue} €</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Current
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <FontAwesomeIcon
                            icon={faShoppingBag}
                            style={{ height: "50px", color: "purple" }}
                          />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Orders</p>
                          <Card.Title as="h4">{shifrat.nrOrders}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      Orders this week : {shifrat.ordersThisWeek}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <FontAwesomeIcon
                            icon={faBox}
                            style={{ height: "50px", color: "#53341e" }}
                          />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Products</p>
                          <Card.Title as="h4">
                            {shifrat.nrProdukteve}
                          </Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      {shifrat.nrKategorive} Different Categories
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </>
          )}
        </Row>
        <Row className="StatisticsRow">
          <Col md="6" className="statisticBlock">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sale Statistics</Card.Title>
                {/* <p className="card-category">Filter By Year</p> */}
              </Card.Header>
              <Card.Body>
                <ShitjetStatistika />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" className="statisticBlock categoryStatistics">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Category Statistics</Card.Title>
                <p className="card-category">Numri i produkteve ne kategori</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth categoryChart"
                  id="chartPreferences"
                >
                  <KategoriteStatistika />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="monthlyRevenueBlock">
          <Col md="10">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly Revenue</Card.Title>
              </Card.Header>
              <Card.Body>
                <RevenueMujore />
              </Card.Body>
              <Card.Footer>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
