.backdrop-order {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  background: rgba(0, 0, 0, 0.2);
  transition: opacity 500ms ease, visibility 500ms ease;

  opacity: 0;
  visibility: hidden;
}

.backdrop-order.active {
  visibility: visible;
  opacity: 1;
}

.modal-order {
  width: 335px;
  background-color: var(--pr-text-DT-color);
  padding: 28px 20px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: 0;
  visibility: hidden;
}

.modal-order.active {
  visibility: visible;
  opacity: 1;
}
.order-modal-close-btn {
  fill: var(--bcg-body-DT-color);
  stroke: var(--bcg-body-DT-color);
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: fill var(--transition-dur-and-func);
}

.order-icon-close {
  display: inline-block;
  stroke-width: 0;
  stroke: var(--primary-text-CH-color);
}

.order-icon-close:hover,
.order-icon-close:focus {
  fill: var(--accent-color);
  stroke: var(--accent-color);
}

.order-btn {
  width: 100%;
  height: 46px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.21;
  border: 1px solid var(--accent-color);
  background-color: var(--accent-color);
  color: var(--pr-text-DT-color);
  border-radius: 15px;
  cursor: pointer;
  transition: color var(--transition-set);
}

.order-btn:hover,
.order-btn:focus {
  background-color: #9bb537;
  color: var(--primary-text-CH-color);
  border: 1px solid #9bb537;
}

.contact-modal-title {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  line-height: calc(22 / 18);
  display: block;
  text-transform: uppercase;
  color: var(--primary-text-CH-color);
  margin-bottom: 54px;
}
.contact-field-wrapper {
  flex-direction: column;
  gap: 42px;
  margin-bottom: 40px;
  display: flex;
}
.input-box {
  position: relative;
}
.order-input-label {
  position: absolute;
  top: -8px;
  transform: translateY(-100%);
  font-weight: 500;
  font-size: 14px;
  line-height: calc(18 / 14);
  display: block;
  color: rgba(5, 5, 5, 0.5);
  transition: color var(--transition-dur-and-func);
}
.input-field {
  border: 1px solid rgba(5, 5, 5, 0.2);
  border-radius: 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: calc(15 / 12);
  padding: 12px 26px 9px 11px;
  color: var(--primary-text-color);
  width: 100%;
  outline: none;
  transition: border-color var(--transition-dur-and-func);
}
.input-field-textarea {
  resize: vertical;
}
.input-field::placeholder {
  color: rgba(5, 5, 5, 0.5);
}
.input-field:focus,
.input-field:focus-visible {
  border-color: var(--pr-text-color);
}

.input-js.invalid {
  border: 2px solid red;
}

.input-js.valid {
  border: 2px solid green;
}

@media screen and (min-width: 768px) {
  .modal-order {
    width: 440px;
    padding: 40px;
  }
  .contact-modal-title {
    margin-bottom: 66px;
  }
  .contact-field-wrapper {
    gap: 44px;
  }
  .order-input-label {
    font-size: 14px;
    line-height: calc(17 / 14);
  }
  .input-field {
    font-size: 14px;
    line-height: calc(17 / 14);
    padding: 15px 36px 15px 15px;
    align-items: center;
  }
}