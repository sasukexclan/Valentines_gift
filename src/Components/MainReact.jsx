import React, {useState, useEffect, use} from 'react';
import fahhhSound from './FAHHH.mp3';
import happiSound from './happi happi happi.mp3';


function MainReact() { 

  const [yesScale , setYesScale] = useState(1);
  const [noScale , setNoScale] = useState(1);
  const [isAccepted , setIsAccepted] = useState(false);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const images = import.meta.glob('./gifs/*.gif', { eager: true });
    const imageUrls = Object.values(images).map((mod) => mod.default);
    setGifs(imageUrls);
  }, []);

  const playSound = () => {
    const audio = new Audio(fahhhSound);
    audio.play();
  };

  const playYesSound = () => {
    const audio2 = new Audio(happiSound);
    audio2.play();
  }


  const handleNoClick = () => {

    // Increase Yes size, decrease No size (clamped at 0.3 so it doesn't vanish)
    setYesScale((prev) => prev + 0.5);
    setNoScale((prev) => Math.max(prev - 0.1, 0.3));
    playSound();
  };

  const handleYesClick = () => {
    //set the size back to normal once "Yes" has been clicked
    setYesScale(1);
    setNoScale(1);
    // Show the success message
    setIsAccepted(true);
    playYesSound();
  };


  return (
  <div className="fixed inset-0 flex items-center justify-center bg-fuchsia-200 overflow-hidden">

    {isAccepted ? (

    <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 opacity-80 pointer-events-none">
          {gifs.map((gif, index) => (
            <img 
              key={index} 
              src={gif} 
              alt="celebration" 
              className="w-full h-full object-cover animate-bounce rounded-lg shadow-sm"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </div>
    ) : null}

      {/* The Square Box */}
    <div className="w-full max-w-xs aspect-square bg-white shadow-2xl rounded-xl flex flex-col items-center justify-between p-8">
    <>
    
    
      <div className='animate-bounce text-rose-800 font-serif text-2xl'>
        <p>Will you be my Valentine?</p>
      </div>

        {/* Circle Logo */}
        <div className="w-25 h-25 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          <div className="tenor-gif-embed" data-postid="11951420229067864601" data-share-method="host" data-aspect-ratio="0.915663" data-width="100%">
            <a href="https://tenor.com/view/cute-gif-11951420229067864601">Cute Sticker</a>
            from <a href="https://tenor.com/search/cute-stickers">Cute Stickers</a></div> 
          <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        </div>

        {/* Button Container */}
        <div className="flex gap-4 w-full">
          
          {/* Yes Button Container */}
          <button 
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
          className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition my-2">
            Yes
          </button>

          {/* No Button Container */}
          <button
          onClick={handleNoClick}
          style={{ transform: `scale(${noScale})` }} 
          className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition my-2">
            No
          </button>
        </div>
        </>
      </div>
    </div>
);

}

export default MainReact;