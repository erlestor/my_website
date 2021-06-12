import React from "react"
import { Link as LinkS } from "react-scroll"
import Icon1 from "../../images/svg-1.svg"
import Icon2 from "../../images/svg-2.svg"
import Icon3 from "../../images/svg-4.svg"
import {
  ServicesContainer,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH1,
  ServicesH2,
  ServicesP,
} from "./ServicesElements"

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <LinkS
          to="signup"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
          offset={-80}
        >
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>Reduce expenses</ServicesH2>
            <ServicesP>
              We help reduce your fees and increase your overall revenue.
            </ServicesP>
          </ServicesCard>
        </LinkS>
        <LinkS
          to="signup"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
          offset={-80}
        >
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Virtual Offices</ServicesH2>
            <ServicesP>
              You can access our ploatform online anywhere in the world.
            </ServicesP>
          </ServicesCard>
        </LinkS>
        <LinkS
          to="signup"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
          offset={-80}
        >
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Premium Benefits</ServicesH2>
            <ServicesP>
              Unlock our special membership card that returns 5% cash back.
            </ServicesP>
          </ServicesCard>
        </LinkS>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services
