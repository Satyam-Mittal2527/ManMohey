export default function bestSeller() {
    return (
        <>
            <div id="spinner"
                className={"show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"}>
                <div className={"spinner-border text-primary"}>
                    <span className={"sr-only"}>Loading...</span>
                </div>
            </div>
            {/* Spinner End */}


            {/* Topbar Start */}
            <div className="container-fluid px-5 d-none border-bottom d-lg-block">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-4 text-center text-lg-start mb-lg-0">
                        <div className="d-inline-flex align-items-center" style={{ height: "45px" }}>
                            <a href="#" className="text-muted me-2"> Help</a><small> / </small>
                            <a href="#" className="text-muted mx-2"> Support</a><small> / </small>
                            <a href="#" className="text-muted ms-2"> Contact</a>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
                        <small className="text-dark">Call Us:</small>
                        <a href="#" className="text-muted">(+012) 1234 567890</a>
                    </div>

                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{ height: "45px" }}>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted me-2" data-bs-toggle="dropdown"><small>
                                    USD</small></a>
                                <div className="dropdown-menu rounded">
                                    <a href="#" className="dropdown-item"> Euro</a>
                                    <a href="#" className="dropdown-item"> Dolar</a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted mx-2" data-bs-toggle="dropdown"><small>
                                    English</small></a>
                                <div className="dropdown-menu rounded">
                                    <a href="#" className="dropdown-item"> English</a>
                                    <a href="#" className="dropdown-item"> Turkish</a>
                                    <a href="#" className="dropdown-item"> Spanol</a>
                                    <a href="#" className="dropdown-item"> Italiano</a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-muted ms-2" data-bs-toggle="dropdown"><small><i
                                    className="fa fa-home me-2"></i> My Dashboard</small></a>
                                <div className="dropdown-menu rounded">
                                    <a href="#" className="dropdown-item"> Login</a>
                                    <a href="#" className="dropdown-item"> Wishlist</a>
                                    <a href="#" className="dropdown-item"> My Card</a>
                                    <a href="#" className="dropdown-item"> Notifications</a>
                                    <a href="#" className="dropdown-item"> Account Settings</a>
                                    <a href="#" className="dropdown-item"> My Account</a>
                                    <a href="#" className="dropdown-item"> Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid px-5 py-4 d-none d-lg-block">
                <div className="row gx-0 align-items-center text-center">
                    <div className="col-md-4 col-lg-3 text-center text-lg-start">
                        <div className="d-inline-flex align-items-center">
                            <a href="" className="navbar-brand p-0">
                                <h1 className="display-5 text-primary m-0"><i
                                    className="fas fa-shopping-bag text-secondary me-2"></i>Electro</h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-6 text-center">
                        <div className="position-relative ps-4">
                            <div className="d-flex border rounded-pill">
                                <input className="form-control border-0 rounded-pill w-100 py-3" type="text"
                                    data-bs-target="#dropdownToggle123" placeholder="Search Looking For?"/>
                                    <select className="form-select text-dark border-0 border-start rounded-0 p-3" style={{width: "200px;"}}>
                                        <option value="All Category">All Category</option>
                                        <option value="Pest Control-2">Category 1</option>
                                        <option value="Pest Control-3">Category 2</option>
                                        <option value="Pest Control-4">Category 3</option>
                                        <option value="Pest Control-5">Category 4</option>
                                    </select>
                                    <button type="button" className="btn btn-primary rounded-pill py-3 px-5" style={{border: "0;"}}><i
                                        className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-3 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center">
                            <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3"><span
                                className="rounded-circle btn-md-square border"><i className="fas fa-random"></i></span></a>
                            <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3">
                                <span className="rounded-circle btn-md-square border"></span><i className="fas fa-heart"></i></a>
                            <a href="#" className="text-muted d-flex align-items-center justify-content-center"><span
                                className="rounded-circle btn-md-square border"><i className="fas fa-shopping-cart"></i></span>
                                <span className="text-dark ms-2">$0.00</span></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Navbar & Hero Start */}
            <div className="container-fluid nav-bar p-0">
                <div className="row gx-0 bg-primary px-5 align-items-center">
                    <div className="col-lg-3 d-none d-lg-block">
                        <nav className="navbar navbar-light position-relative" style={{width: "250px;"}}>
                            <button className="navbar-toggler border-0 fs-4 w-100 px-0 text-start" type="button"
                                data-bs-toggle="collapse" data-bs-target="#allCat">
                                <h4 className="m-0"><i className="fa fa-bars me-2"></i>All Categories</h4>
                            </button>
                            <div className="collapse navbar-collapse rounded-bottom" id="allCat">
                                <div className="navbar-nav ms-auto py-0">
                                    <ul className="list-unstyled categories-bars">
                                        <li>
                                            <div className="categories-bars-item">
                                                <a href="#">Accessories</a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="categories-bars-item">
                                                <a href="#">Electronics & Computer</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="categories-bars-item">
                                                <a href="#">Laptops & Desktops</a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="categories-bars-item">
                                                <a href="#">Mobiles & Tablets</a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="categories-bars-item">
                                                <a href="#">SmartPhone & Smart TV</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-lg-9">
                        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                            <a href="" className="navbar-brand d-block d-lg-none">
                                <h1 className="display-5 text-secondary m-0"><i
                                    className="fas fa-shopping-bag text-white me-2"></i>Electro</h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars fa-1x"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="index.html" className="nav-item nav-link">Home</a>
                                    <a href="shop.html" className="nav-item nav-link">Shop</a>
                                    <a href="single.html" className="nav-item nav-link">Single Page</a>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link active" data-bs-toggle="dropdown"><span
                                            className="dropdown-toggle">Pages</span></a>
                                        <div className="dropdown-menu m-0">
                                            <a href="bestseller.html" className="dropdown-item active">Bestseller</a>
                                            <a href="cart.html" className="dropdown-item">Cart Page</a>
                                            <a href="cheackout.html" className="dropdown-item">Cheackout</a>
                                            <a href="404.html" className="dropdown-item">404 Page</a>
                                        </div>
                                    </div>
                                    <a href="contact.html" className="nav-item nav-link me-2">Contact</a>
                                    <div className="nav-item dropdown d-block d-lg-none mb-3">
                                        <a href="#" className="nav-link" data-bs-toggle="dropdown"><span className="dropdown-toggle">All
                                            Category</span></a>
                                        <div className="dropdown-menu m-0">
                                            <ul className="list-unstyled categories-bars">
                                                <li>
                                                    <div className="categories-bars-item">
                                                        <a href="#">Accessories</a>
                                                        <span>(3)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="categories-bars-item">
                                                        <a href="#">Electronics & Computer</a>
                                                        <span>(5)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="categories-bars-item">
                                                        <a href="#">Laptops & Desktops</a>
                                                        <span>(2)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="categories-bars-item">
                                                        <a href="#">Mobiles & Tablets</a>
                                                        <span>(8)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="categories-bars-item">
                                                        <a href="#">SmartPhone & Smart TV</a>
                                                        <span>(5)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <a href="" className="btn btn-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"><i
                                    className="fa fa-mobile-alt me-2"></i> +0123 456 7890</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">Bestseller Products</h1>
                <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Bestseller</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            {/* Searvices Start */}
            <div className="container-fluid px-0">
                <div className="row g-0">
                    <div className="col-6 col-md-4 col-lg-2 border-start border-end wow fadeInUp" data-wow-delay="0.1s">
                        <div className="p-4">
                            <div className="d-inline-flex align-items-center">
                                <i className="fa fa-sync-alt fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Free Return</h6>
                                    <p className="mb-0">30 days money back guarantee!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.2s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fab fa-telegram-plane fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Free Shipping</h6>
                                    <p className="mb-0">Free shipping on all order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.3s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-life-ring fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Support 24/7</h6>
                                    <p className="mb-0">We support online 24 hrs a day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.4s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-credit-card fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Receive Gift Card</h6>
                                    <p className="mb-0">Recieve gift all over oder $50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.5s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-lock fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Secure Payment</h6>
                                    <p className="mb-0">We Value Your Security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 border-end wow fadeInUp" data-wow-delay="0.6s">
                        <div className="p-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-blog fa-2x text-primary"></i>
                                <div className="ms-4">
                                    <h6 className="text-uppercase mb-2">Online Service</h6>
                                    <p className="mb-0">Free return products in 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Searvices End */}


            {/* Products Offer Start */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
                            <a href="#" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                                <div>
                                    <p className="text-muted mb-3">Find The Best Camera for You!</p>
                                    <h3 className="text-primary">Smart Camera</h3>
                                    <h1 className="display-3 text-secondary mb-0">40% <span
                                        className="text-primary fw-normal">Off</span></h1>
                                </div>
                                <img src="img/product-1.png" className="img-fluid" alt=""/>
                            </a>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3s">
                            <a href="#" className="d-flex align-items-center justify-content-between border bg-white rounded p-4">
                                <div>
                                    <p className="text-muted mb-3">Find The Best Whatches for You!</p>
                                    <h3 className="text-primary">Smart Whatch</h3>
                                    <h1 className="display-3 text-secondary mb-0">20% <span
                                        className="text-primary fw-normal">Off</span></h1>
                                </div>
                                <img src="img/product-2.png" className="img-fluid" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Products Offer End */}


            {/* Bestseller Products Start */}
            <div className="container-fluid products pt-5">
                <div className="container products-mini py-5">
                    <div className="mx-auto text-center mb-5" style={{maxWidth: "700px;"}}>
                        <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
                            data-wow-delay="0.1s">Bestseller Products</h4>
                        <p className="mb-0 wow fadeInUp" data-wow-delay="0.2s">Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi, asperiores ducimus sint quos tempore officia similique quia? Libero, pariatur
                            consectetur?</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-3.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-4.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-5.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-6.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-7.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-11.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bestseller Products End */}


            {/* Our Products Start */}
            <div className="container-fluid product pt-5">
                <div className="container py-5">
                    <div className="tab-class">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start wow fadeInLeft" data-wow-delay="0.1s">
                                <h1>Our Products</h1>
                            </div>
                            <div className="col-lg-8 text-end wow fadeInRight" data-wow-delay="0.1s">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill"
                                            href="#tab-1">
                                            <span className="text-dark" style={{width: "130px;"}}>All Products</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex py-2 mx-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{width: "130px;"}}>New Arrivals</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                            <span className="text-dark" style={{width: "130px;"}}>Featured</span>
                                        </a>
                                    </li>
                                    <li className="nav-item mb-4">
                                        <a className="d-flex mx-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                            <span className="text-dark" style={{width: "130px;"}}>Top Selling</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-3.png" className="img-fluid w-100 rounded-top" alt=""/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-4.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-sale">sale</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-5.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-6.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-7.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-sale">Sale</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-8.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-9.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-10.png" className="img-fluid w-100 rounded-top" alt=""/>
                                                        <div className="product-sale">Sale</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-3.png" className="img-fluid rounded-top" alt=""/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-4.png" className="img-fluid w-100 rounded-top" alt=""/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-5.png" className="img-fluid w-100 rounded-top" alt=""/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-6.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-new">New</div>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-9.png" className="img-fluid w-100 rounded-top" alt=""/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-10.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-11.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-12.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-4" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-14.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-15.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-17.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                        <div className="product-item rounded wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="product-item-inner border rounded">
                                                <div className="product-item-inner-item">
                                                    <img src="img/product-16.png" className="img-fluid w-100 rounded-top"
                                                        alt="Image"/>
                                                        <div className="product-details">
                                                            <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                                                        </div>
                                                </div>
                                                <div className="text-center rounded-bottom p-4">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                            <div
                                                className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                                                <a href="#"
                                                    className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"><i
                                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-random"></i></span></a>
                                                        <a href="#"
                                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                                className="rounded-circle btn-sm-square border"><i
                                                                    className="fas fa-heart"></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Our Products End */}

            {/* Product List Satrt */}
            <div className="container-fluid products productList overflow-hidden">
                <div className="container products-mini py-5">
                    <div className="mx-auto text-center mb-5" style={{maxWidth: "900px;"}}>
                        <h4 className="text-primary border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
                            data-wow-delay="0.1s">Products</h4>
                        <h1 className="mb-0 display-3 wow fadeInUp" data-wow-delay="0.3s">All Product Items</h1>
                    </div>
                    <div className="productList-carousel owl-carousel wow fadeInUp" data-wow-delay="0.3s">
                        <div className="productImg-carousel owl-carousel productList-item">
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-4.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-4.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-6.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-7.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productImg-carousel owl-carousel productList-item">
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-8.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-9.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-10.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-11.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productImg-carousel owl-carousel productList-item">
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-12.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-13.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-14.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-15.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productImg-carousel owl-carousel productList-item">
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-16.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-17.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="productImg-item products-mini-item border">
                                <div className="row g-0">
                                    <div className="col-5">
                                        <div className="products-mini-img border-end h-100">
                                            <img src="img/product-3.png" className="img-fluid w-100 h-100" alt="Image"/>
                                                <div className="products-mini-icon rounded-circle bg-primary">
                                                    <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="products-mini-content p-3">
                                            <a href="#" className="d-block mb-2">SmartPhone</a>
                                            <a href="#" className="d-block h4">Apple iPad Mini <br/> G2356</a>
                                            <del className="me-2 fs-5">$1,250.00</del>
                                            <span className="text-primary fs-5">$1,050.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-mini-add border p-3">
                                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                        className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                    <div className="d-flex">
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                className="rounded-circle btn-sm-square border"><i
                                                    className="fas fa-random"></i></span></a>
                                        <a href="#"
                                            className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product List End */}

            {/* Product Banner Start */}
            <div className="container-fluid py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <a href="#">
                                <div className="bg-primary rounded position-relative">
                                    <img src="img/product-banner.jpg" className="img-fluid w-100 rounded" alt=""/>
                                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center rounded p-4"
                                            style={{background: "rgba(255, 255, 255, 0.5);"}}>
                                            <h3 className="display-5 text-primary">EOS Rebel <br/> <span>T7i Kit</span></h3>
                                            <p className="fs-4 text-muted">$899.99</p>
                                            <a href="#" className="btn btn-primary rounded-pill align-self-start py-2 px-4">Shop Now</a>
                                        </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
                            <a href="#">
                                <div className="text-center bg-primary rounded position-relative">
                                    <img src="img/product-banner-2.jpg" className="img-fluid w-100" alt=""/>
                                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center rounded p-4"
                                            style={{background: "rgba(242, 139, 0, 0.5);"}}>
                                            <h2 className="display-2 text-secondary">SALE</h2>
                                            <h4 className="display-5 text-white mb-4">Get UP To 50% Off</h4>
                                            <a href="#" className="btn btn-secondary rounded-pill align-self-center py-2 px-4">Shop
                                                Now</a>
                                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-4 rounded mb-5" style={{background: "rgba(255, 255, 255, .03);"}}>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: "70px", height: "70px" }}>
                                    <i className="fas fa-map-marker-alt fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Address</h4>
                                    <p className="mb-2">123 Street New York.USA</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: "70px", height: "70px" }}>
                                    <i className="fas fa-envelope fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Mail Us</h4>
                                    <p className="mb-2">info@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: "70px", height: "70px" }}>
                                    <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Telephone</h4>
                                    <p className="mb-2">(+012) 3456 7890</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="rounded p-4">
                                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: "70px", height: "70px" }}>
                                    <i className="fab fa-firefox-browser fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="text-white">Yoursite@ex.com</h4>
                                    <p className="mb-2">(+012) 3456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <div className="footer-item">
                                    <h4 className="text-primary mb-4">Newsletter</h4>
                                    <p className="text-white mb-3">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum
                                        dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                                    <div className="position-relative mx-auto rounded-pill">
                                        <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" type="text"
                                            placeholder="Enter your email"/>
                                            <button type="button"
                                                className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">SignUp</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Customer Service</h4>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Contact Us</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Returns</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Order History</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Site Map</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Testimonials</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> My Account</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Unsubscribe Notification</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Information</h4>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> About Us</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Delivery infomation</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Privacy Policy</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Terms & Conditions</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Warranty</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> FAQ</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Seller Login</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-primary mb-4">Extras</h4>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Brands</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Gift Vouchers</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Affiliates</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Wishlist</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Order History</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Track Your Order</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Track Your Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}


            {/* Copyright Start */}
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-white"><a href="#" className="border-bottom text-white"><i
                                className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right
                                reserved.</span>
                        </div>
                        <div className="col-md-6 text-center text-md-end text-white">

                            {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. ***/}
                            {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, ***/}
                            {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ***/}
                            Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>.
                            Distributed By <a className="border-bottom text-white" href="https://themewagon.com">ThemeWagon</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
 }   
