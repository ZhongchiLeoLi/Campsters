mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());

var el = document.createElement('div');
  el.className = 'marker';
  // el.style.backgroundImage = 'url("../images/tent.png")';
  // el.style.width = '45px';
  // el.style.height = '45px';

new mapboxgl.Marker(el)
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
      new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3>`
        )
  )
  .addTo(map)