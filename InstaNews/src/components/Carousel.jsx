import React from "react";

const Carousel = ()=>{
    return(
<div className="container my-4  " >
  <div
    id="carouselExampleCaptions"
    className="carousel slide mx-auto "
    style={{
      maxWidth: '100%',
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
    }}
  >
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div className="carousel-inner" style={{backgroundColor:"rgb(226, 222, 222)"}}  >
      {/* Slide 1 */}
      <div className="carousel-item active " >
        <img
          src="https://timesofindia.indiatimes.com/photo/106599232.cms"
          className="d-block w-100 img-fluid"
          style={{ 
  height: '50vh', 
  objectFit: 'contain',  // shows full image
  objectPosition: 'center center',  // centers image
  // backgroundColor: 'whi' // fills sides with black (optional)
}}
          alt="Slide 1"
        />
        <div className="carousel-caption d-block my-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "0.5rem" }}>
          <h6 className="fw-bold">Household energy bills may fall in July after US President Donald Trump’s trade tariffs caused a slump in global gas prices</h6>
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
     
  </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4N3RGS0tgOQWTmO8by2rW_MGV93BINrrYWQ&s"
          className="d-block w-100 img-fluid"
          style={{ 
  height: '50vh', 
  objectFit: 'contain',  // shows full image
  objectPosition: 'center center',  // centers image
  // backgroundColor: 'black' // fills sides with black (optional)
}}
          alt="Slide 2"
        />
        <div className="carousel-caption d-block my-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "0.5rem" }}>
          <h6 className="fw-bold">Hyderabad floods highlight the need for a disaster mitigation and climate resilience plan</h6>
          
        </div>
      </div>

      {/* Slide 3 */}
      <div className="carousel-item">
        <img
          src="https://etvbharatimages.akamaized.net/etvbharat/prod-images/26-04-2025/1200-675-24039801-thumbnail-16x9-pahal-aspera.jpg"
          className="d-block w-100 img-fluid"
          style={{ 
  height: '50vh', 
  objectFit: 'contain',  // shows full image
  objectPosition: 'center center',  // centers image
  // backgroundColor: 'black' // fills sides with black (optional)
}}
          alt="Slide 3"
        />
        <div className="carousel-caption d-block my-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "0.5rem" }}>
          <h6 className="fw-bold">Pahalgam Terror Attack: The History Of Pakistan's Proxy War Against India</h6>
           
        </div>
      </div>
    </div>

    {/* Controls */}
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>

    )
}
export default Carousel;