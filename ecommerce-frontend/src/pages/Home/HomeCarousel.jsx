// HomeCarousel.jsx
import React from 'react';
// import oldmoney from '../Home/assets/oldmoney.mp4';
// import tennispic from '../Home/assets/tennis.mp4';
// import kidspic from '../Home/assets/kids.mp4';
// import eyewear from '../Home/assets/eyewear.mp4';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect,useState } from 'react';
import './HomeCarousel.css';
import axios from 'axios';
import { Button } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import AddVideo from '../../components/HomeVideos/AddVideo';
import RemoveVideo from '../../components/HomeVideos/RemoveVideo';

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoData,setVideoData] = useState([]);
  const [refreshKey,setRefreshKey] = useState('');
  const [shfaqShto,setShfaqShto] = useState(false);
  const [shfaqFshij,setShfaqFshij] = useState(false);

  const useri  = JSON.parse(localStorage.getItem("userDetails"));
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchVideos = async ()=>{
     const response = await axios.get("https://localhost:7061/api/HomeVideo/getVideot")
      // .then((response)=>{
        setVideoData(response.data);
        setLoading(false)
      // })
    } 

    fetchVideos();
  },[refreshKey])


  useEffect(() => {
    const videoDuration = 6000; 
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videoData.length);
    }, videoDuration);

    return () => clearInterval(interval);
  }, [videoData.length])

  return (
    <>
    {
      shfaqShto && 
      <AddVideo 
        mbyllShto = {()=>setShfaqShto(false)}
        refreshTeDhenat = {()=>setRefreshKey(Date.now())}
      />
    }

    {
      shfaqFshij && 
      <RemoveVideo 
        mbyllFshij = {()=>setShfaqFshij(false)}
        refreshTeDhenat = {()=>setRefreshKey(Date.now())}
      />
    }

    <div>
      <div id="home-carousel" className="carousel slide carousel-fade">
        <div className="carousel-inner">
        {loading ? (
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"500px"}}>
                <TailSpin
                  height="120"
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
              {videoData.length > 0 ? (
                videoData.map((video, index) => (
                  <div
                  key={index}
                  className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  >
                    <video src={"/videos/"+video.videoUrl} autoPlay loop muted>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <div className="placeholder-container">
                    <img
                      src="/images/shop-placeholder.jpg"
                      alt="Placeholder"
                      className="placeholder-image"
                      style={{width:"100%",height:"750px"}}
                      />
                    <p className="placeholder-text">No videos available at the moment</p>
                  </div>
                </div>
              )}
              </>
            )}
      
        </div>
      </div>
      {useri && (useri.roles.includes("Admin") || useri.roles.includes("Menaxher")) &&       
        <div className='home-video-buttons'>
          <Button onClick={()=>setShfaqShto(true)}
          className="shtoVideo"
            >
            Add new video
            <i className="fa-solid fa-film" style={{paddingLeft:"4px"}}></i>
          </Button>
          <Button onClick={()=>setShfaqFshij(true)}
          className="removeVideo"  
          >
            Remove Video
            <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
          </Button>
        </div>
      }
    </div>
    </>
  );
};


export default HomeCarousel;
