const InfoTooltip = ({ image, regText }) => {
    return (
        <div className='popup__red-container'>
            <img className='popup__reg-check' src={image} alt='ок' />
            <h2 className='popup__reg-text' >{regText}</h2>
        </div>
    )
}
export default InfoTooltip

