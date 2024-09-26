export default function Circle() {
    return(
        <div style={{
            height: '25px',
            width: '25px',
            border: '1px solid black', // Black border
            borderRadius: '50%', // Makes the div a circle
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white' // Optional: white background color
        }}>
        </div>
    )
}