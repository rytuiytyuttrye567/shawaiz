const Manager = (props) => {
  const Data = props.Data;
  return (
    <>
      <div className="body-wrapper">
        <div className="body-model-ct">
          <div className="d-flex justify-content-end w-100 mb-2">
            <button
              className="btn_close_bmct"
              onClick={() => {
                props.SetPopup(<></>);
              }}
            >
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="CloseIcon"
              >
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            <div className="cheadsm_db myprofile_m">
              <img
                src={`${
                  Data?.profile === null || Data?.profile === ""
                    ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNDY5Ljc2Ij48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMzkuNjQgMTkxLjI4YzMuMzQtOS4yOCA4LjQ0LTEyLjI5IDE1LjE2LTEyLjFsLTQuNDMtMi45NGMtMi40LTMwLjA1IDQuNjQtODIuMTgtMjcuOTktOTIuMDUgNjEuNzQtNzYuMyAxMzIuOS0xMTcuNzkgMTg2LjMzLTQ5LjkyIDY0LjM3IDMuMzggOTAuMTkgMTA1LjY3IDM4Ljg1IDE0OC43M2wtLjMgMi41NGMyLjAxLS42MSA0LjAyLTEgNS45NS0xLjE1IDMuNzktLjI5IDcuNDIuMzMgMTAuNTEgMS45NyAzLjM5IDEuODEgNS45OCA0Ljc0IDcuMzEgOC44OSAxLjI4IDMuOTcgMS4zMyA5LjA0LS4zNSAxNS4yN2wtOC4wMyAyMi43OGMtMS4zIDMuNy0yLjQ5IDYuMy01LjA4IDguMzYtMi42NyAyLjExLTUuOSAyLjktMTAuOSAyLjYzLS44My0uMDQtMS42Ni0uMTMtMi40Ny0uMjhhNTUuNjcgNTUuNjcgMCAwIDEtMy42OCAxNi4zMmMtMi43NyA3LjEyLTYuNjMgMTIuOTMtMTAuNDMgMTguMjktNC4zIDYuMDUtOC44NSAxMS41My0xMy42IDE2LjQ1IDMuNyAxMi45OSA4LjQ3IDIyLjU2IDE0LjE5IDI5Ljg0IDI5LjA0IDIwLjg4IDEwNy4yNSAyNS43OSAxMzQuNDggNDAuOTcgMzkuMzEgMjIgMzguMjMgNjQuNTIgNDYuODQgMTAzLjg4SDBjOC41My0zOS4wMSA3LjY1LTgyLjIzIDQ2Ljg0LTEwMy44OCAzNC41Mi0xOS4yMiAxMDcuNzctMTcuOTkgMTM2Ljk2LTQyLjkgNC4yLTYuNTggNy43NS0xNC40NiAxMC40Ny0yMy44Ni02LjIzLTYuNDgtMTIuMDctMTQuMTgtMTcuMzktMjMuMTJsLS4zNi0uNTdjLTQuOC04LjA2LTEwLjYtMTcuNzktMTIuNDItMzEuM2wtMS41Ni4wM2MtMy4yNy0uMDQtNi40Mi0uNzktOS4zNy0yLjQ2LTQuNzQtMi43LTguMDYtNy4zLTEwLjMtMTIuNDlsLS4yLS41MmMtMi41Mi02LjA5LTMuNjctMTMuMDMtMy45NC0xOC4yOC0uMS0xLjk2LS4xLTUuODUuMDEtOS41N3YtLjA1Yy4wOC0zLjE5LjI1LTYuMjguNDktOC4wMS4wOC0uNTMuMjEtMS4wMy40MS0xLjV6bTE4Mi45MyAxNDMuNjgtLjYzLS43NWMtNi4yMy03LjQ5LTExLjQ4LTE2Ljk1LTE1LjY0LTI5LjI4LTYuNzkgNS41NS0xNC40OCAxMC4yNi0yMi43NSAxMy43NmwtLjQzLjE5aC0uMDFjLTEwLjcyIDQuNjgtMjEuNzkgNi45NC0zMi43NiA2LjY5LTUuOTUtLjEzLTExLjg2LTEtMTcuNjctMi42MWwtLjIyLS4wNmMtOS41MS0yLjUzLTE4Ljk2LTcuMDktMjgtMTQuMDYtMy43MiAxMC43Mi04LjU1IDE5LjYtMTQuMiAyNi45M2wzMy45MiA4Mi44NCAxOS45My00NS45Ni05LjczLTEwLjYzYy03LjMxLTEwLjY5LTMuMDYtMjMuMSA4Ljc1LTI1LjAxIDUuMTYtLjgzIDI2LjA0LS45NSAzMC44Mi4zMyAxMC43IDIuODYgMTMuODkgMTQuOTcgNy42MiAyNC42OGwtOS43MyAxMC42MyAxOS43NiA0NS45NiAzMC45Ny04My42NXptLTExNy4zOC00Mi4xOS40LjM0YzE1LjM1IDE0LjY4IDMyLjM2IDIwLjIgNDguNTEgMTkuNTcgMTkuNDgtLjc3IDM3Ljg5LTEwLjM3IDUwLjg1LTIzLjY1LjQxLS40Mi44OC0uOCAxLjQxLTEuMDkgNC44LTQuODEgOS40MS0xMC4yOSAxMy43Ni0xNi40MSAzLjM0LTQuNzEgNi43Mi05Ljc4IDguOTktMTUuNjEgMi4yMS01LjY4IDMuNDctMTIuMzMgMi43OC0yMC41MS0uMDgtMS4zMi4yMy0yLjY4IDEuMDEtMy44NmE2LjExMiA2LjExMiAwIDAgMSA4LjQ2LTEuNzVjMS4wNy43IDIuMTYgMS4yOCAzLjI1IDEuNjguOTQuMzQgMS44NS41NSAyLjY4LjU5IDEuNzUuMDkgMi41NC4wOSAyLjY1IDAgLjE5LS4xNC41OC0xLjE5IDEuMTYtMi44NGw3Ljc5LTIyLjA2Yy45OS0zLjcyIDEuMDYtNi40LjQ5LTguMTgtLjI5LS45LS44LTEuNTEtMS40Mi0xLjg0LS45Mi0uNDktMi4yNy0uNjYtMy44NC0uNTQtMy40Mi4yNi03LjQyIDEuOTItMTAuOTcgNC42MS0xLjMuOTgtMi45OSAxLjQ1LTQuNzIgMS4xNS0zLjMzLS41Ny01LjU4LTMuNzQtNS4wMS03LjA3IDUuNzctMzMuNjcgMy4xMy01NS42MS00LjA0LTcwLjU3LTYuMjgtMTMuMTEtMTYuMy0yMS4wNS0yNy4xNy0yNi45OC0yNC4xMiAxOC40Ny00MS4xIDIwLjU4LTU4LjA0IDIyLjY3LTE0LjAxIDEuNzMtMjcuOTkgMy40Ni00Ni41MSAxNi4yNy04Ljc1IDYuMDUtMTQuNTggMTMuMzctMTcuNTkgMjEuODctMy4wOSA4LjczLTMuMzMgMTguODktLjgzIDMwLjQuMzIgMS4xNi4yOSAyLjQzLS4xNiAzLjY1LTEuMTQgMy4xNy00LjY2IDQuODEtNy44MyAzLjY3bC01LjYxLTIuMDNjLTcuMjQtMi41My0xMi4zNy0zLjcxLTE0LjM1Ljg0LS4xNiAxLjQ3LS4yNyAzLjcyLS4zMyA2LjA0di4wNWMtLjA5IDMuMzUtLjA5IDYuODUtLjAxIDguNjEuMjEgNC4xNSAxLjA4IDkuNTUgMi45NyAxNC4xM2wuMjIuNDVjMS4yNyAyLjk3IDIuOTYgNS40OSA1LjA2IDYuNjggMS4wNi42IDIuMjQuODggMy40OC44OSAxLjUyLjAyIDMuMjEtLjMgNS4wMS0uODMuNTctLjIgMS4xOC0uMzEgMS44Mi0uMzJhNi4xMTEgNi4xMTEgMCAwIDEgNi4yNiA1Ljk2Yy4zMyAxNC4xIDYuMzggMjQuMjQgMTEuMjUgMzIuNDFsLjM0LjU3YzUuNDQgOS4xNCAxMS40NCAxNi44MSAxNy44MyAyMy4wNHoiLz48L3N2Zz4="
                    : Data?.profile
                }`}
                alt="Profile"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="cheadsm_db">Name</div>
            <div className="cheadsm_num walletlink_chain">
              {Data?.first_name + " " || " "}
              {Data?.last_name || " "}
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="cheadsm_db">Email</div>
            <div className="cheadsm_num walletlink_chain">{Data?.email}</div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="cheadsm_db">Phone</div>
            <div className="cheadsm_num walletlink_chain">{Data?.phone}</div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="cheadsm_db">Department</div>
            <div className="cheadsm_num walletlink_chain">
              {Data?.department}
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="cheadsm_db">Position</div>
            <div className="cheadsm_num walletlink_chain">{Data?.position}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Manager;
