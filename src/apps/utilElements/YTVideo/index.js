import "./style.css"

export function YTVideo({url, alt, className=""}) {
    return (
        <div className={`yt-video-container ${className}`}>
            <div className="yt-video">
                <iframe src={url} title={`YouTube video - ${alt}`} alt={alt} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
            </div>
        </div>
    )
}