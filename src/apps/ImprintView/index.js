import "./style.css"
import StandardPage from "../StandardPage"


export default function ImprintView() {
  return(
    <StandardPage className="imprint-view" title="Imprint 🎉">
      <h2>Information pursuant to &sect; 5 TMG</h2>
      <p>
        Partycipate AG<br/>
        Roteb&uuml;hlplatz 41<br/>
        Geb&auml;ude 1<br/>
        70178 Stuttgart
      </p>
      
      <p>
        Commercial Register: HRB 999999<br/>
        Registration Court: Amtsgericht Stuttgart
      </p>
      
      <p>
        <strong>Represented by:</strong><br/>
        Marlo Kessler<br />
        Jannik Sinz <br />
        Giovanni Carlucci<br />
        Ines Maurer <br />
        Laura Zurheiden<br />
        Alexandra Friesen<br />
        Melanie Rudloff<br />
        Jarg Heyll<br />
        Andreas Pitsch
      </p>
      
      <p>
        <strong>Chairman of Supervisory Board:</strong><br/>
        Bj&ouml;rn St&uuml;tz
      </p>
      
      <h2>Contact</h2>
      <p>
        Telephone: +49 (0) 123 44 55 66<br/>
        Telefax: +49 (0) 123 44 55 99<br/>
        E-Mail: { process.env.REACT_APP_INFO_EMAIL_ADDRESS }
      </p>
      
      <h2>VAT-ID</h2>
      <p>
        Sales tax identification number according to  &sect; 27 a Umsatzsteuergesetz:<br/>
        DE999999999
      </p>
      
      <h2>EU dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr/</a>. <br/>
        Our e-mail address can be found above in the site notice. <br/>
        We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>
      
      <h2>Liability for Contents</h2> 
      <p>As service providers, we are liable for own contents of these websites according to Paragraph 7, Sect. 1 German Telemedia Act (TMG). However, according to Paragraphs 8 to 10 German Telemedia Act (TMG), service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.</p> 
      <p>Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.</p> 
      
      <h2>Liability for Links</h2> 
      <p>Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.</p> 
      <p>The linked websites had been checked for possible violations of law at the time of the establishment of the link. Illegal contents were not detected at the time of the linking. A permanent monitoring of the contents of linked websites cannot be imposed without reasonable indications that there has been a violation of law. Illegal links will be removed immediately at the time we get knowledge of them.</p> 
      
      <h2>Copyright</h2> 
      <p>
        Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator. Downloads and copies of these websites are permitted for private use only. <br/> 
        The commercial use of our contents without permission of the originator is prohibited.
      </p> 
      <p>Copyright laws of third parties are respected as long as the contents on these websites do not originate from the provider. Contributions of third parties on this site are indicated as such. However, if you notice any violations of copyright law, please inform us. Such contents will be removed immediately.</p>
    </StandardPage>
  )
}