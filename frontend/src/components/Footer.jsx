import React from "react"

const date = new Date().getFullYear()

function Footer() {

    return (
        <footer className="footer">
            <p className="footer__author">{date} Mesto Russia</p>
        </footer>
    )
}
export default Footer;

