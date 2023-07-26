import './TopNavComponent.css'
import logoIcon from '../../assets/train-logo.svg'

function TopNavComponent({siteName}) {
    return ( <>
        <div className="TopNavWrapper">
            <div className="SiteName">
                {siteName}
                <div className="siteIcon">
                    <img src={logoIcon} height={40} width={40}/>
                </div>
            </div>
            <div className="todayDate">
                {new Date().toLocaleDateString('en-US',{day:'numeric',month: 'short', year : 'numeric'})}
            </div>
        </div>
    </> );
}

export default TopNavComponent;