import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import "./PorosiaDetajet.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const PorosiaDetajet = (props) => {
  const navigate = useNavigate();
  const [detajetFatures, setDetajetFatures] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subtotali, setSubtotali] = useState(0);

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const formatoDaten = (data) => {
    const date = new Date(data + "Z");
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (props.porosiaId) {
        try {
          const response = await axios.get(
            `https://localhost:7061/api/Porosia/shfaqFaturenPorosise/${props.porosiaId}`
          );
          setDetajetFatures(response.data);
          let cmimi = 0;
          response.data.produktet.forEach((produkti) => {
            cmimi += produkti.cmimi * produkti.sasiaPorositur;
          });
          setSubtotali(cmimi);

          const businessResponse = await axios.get(
            `https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat`
          );
          setBusinessData(businessResponse.data);

          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log(error.response.status);
            navigate("/error");
          } else {
            console.log(error);
          }
        }
      }
    };

    fetchData();
  }, [props.porosiaId]);

  const handleDownloadPdf = () => {
    const input = document.getElementById("fatura");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", [imgWidth, pageHeight]);
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("receipt.pdf");
      // const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF({
      //   orientation: 'p',
      //   unit: 'mm',
      //   format: 'a4'
      // });
      // const imgProps= pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save('download.pdf');
    });
  };

  return (
    <div className="receipt-page">
      {loading ? (
        <div className="loading productsPageLoader">
          <TailSpin
            height="260"
            width="120"
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
          <div className="receipt-container" id="fatura">
            <h2 className="receipt-header">Fatura</h2>
            <div className="business-info">
              <h2 className="business-name">{businessData.emriBiznesit}</h2>
              <p className="business-contact">
                <span>{businessData.nrKontaktues}</span>
                <br />
                <span>{businessData.emailBiznesit}</span>
              </p>
            </div>
            <div className="receipt-details">
              <div className="receipt-detail-row">
                <span>Porosia ID:</span>
                <span>#{props.porosiaId}</span>
              </div>
              <div className="receipt-detail-row">
                <span>Klienti:</span>
                <span>{detajetFatures.klientiEmri}</span>
              </div>
              <div className="receipt-detail-row">
                <span>Data Porosise:</span>
                <span>{formatoDaten(detajetFatures.dataPorosise)}</span>
              </div>
              <div className="receipt-detail-row">
                <span>Nr Kontaktues:</span>
                <span> +{detajetFatures.nrKontaktues}</span>
              </div>
              <div className="receipt-detail-row">
                <span>Adresa Derguese:</span>
                <span style={{ textAlign: "right" }}>
                  {detajetFatures.adresa}
                  <br />
                  {detajetFatures.qyteti},{detajetFatures.zipKodi}
                  <br />
                  {detajetFatures.shteti}
                </span>
              </div>
              <div className="receipt-items">
                <h3 className="items-header">Produktet</h3>
                {detajetFatures.produktet.map((item, index) => (
                  <div key={index} >
                    <div className="item-row">
                    <img
                      src={`/images/${item.fotoProduktit}`}
                      alt={item.emriProdukti}
                      style={{ height: "50px", width: "60px" ,marginRight:"10px"}}
                      />
                      <span className="item-name">
                        {item.sasiaPorositur}x {item.emriProdukti}
                      </span>
                      <span className="item-price">
                        <span
                          style={{
                            borderBottom: "dashed",
                            paddingBottom: "4px",
                          }}
                        >
                          {item.sasiaPorositur}* {item.cmimi} €
                        </span>
                        {/* {formatPrice(item.cmimi*item.sasiaPorositur)} € */}
                      </span>
                    </div>
                    <div className="item-row">
                      <span className="item-price">
                        {/* {item.sasiaPorositur}* {item.cmimi} */}
                        {formatPrice(item.cmimi * item.sasiaPorositur)} €
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="receipt-cmimi-row subtotali">
                <span>Subtotali:</span>
                <span>{formatPrice(subtotali)} €</span>
              </div>
              <div className="receipt-cmimi-row shipping">
                <span>Transporti:</span>
                <span>{subtotali >= 100 ? 0 : 4} €</span>
              </div>
              <div className="receipt-cmimi-row">
                <span>Totali (pa TVSH):</span>
                <span>
                  {formatPrice(subtotali + (subtotali >= 100 ? 0 : 4))} €
                </span>
              </div>
              <div className="receipt-cmimi-row tvsh">
                <span>TVSH (10%)</span>
                <span>
                  {formatPrice((subtotali + (subtotali >= 100 ? 0 : 4)) * 0.1)}{" "}
                  €
                </span>
              </div>
              <div className="receipt-total-row">
                <span>Totali:</span>
                <span> {detajetFatures.cmimiTotal} €</span>
              </div>
              <p className="receipt-footer">Ju falenderojme per blerjen!</p>
            </div>
          </div>
          <div className="download-faturen-container">    
            <Button onClick={handleDownloadPdf} className="download-faturen">
              Download PDF
              <FontAwesomeIcon icon={faDownload} />
            </Button>
           </div>
        </>
      )}
    </div>
  );
};

export default PorosiaDetajet;