"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalBirthView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	CircleAttachView_1 = require("../../AutoAttach/CircleAttachView"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PersonalController_1 = require("../Controller/PersonalController"),
	PersonalBirthAttachItem_1 = require("./PersonalBirthAttachItem"),
	SHOW_GAP = 2,
	MONTH_COUNT = 12;
class PersonalBirthView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.P4i = void 0),
			(this.x4i = void 0),
			(this.w4i = void 0),
			(this.B4i = void 0),
			(this.b4i = [1, 3, 5, 7, 8, 10, 12]),
			(this.q4i = 31),
			(this.G4i = 30),
			(this.N4i = 29),
			(this.O4i = !1),
			(this.k4i = !1),
			(this.m7t = () => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"SetBirthSuccess",
					);
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t),
					this.CloseMe();
			}),
			(this.OnLeftButtonClicked = () => {
				this.CloseMe();
			}),
			(this.OnRightButtonClicked = () => {
				var t;
				this.IsSetBirth()
					? this.CloseMe()
					: ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							109,
						)).FunctionMap.set(2, () => {
							PersonalController_1.PersonalController.SendBirthdayInitRequest(
								100 * this.w4i + this.B4i,
							);
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							t,
						));
			}),
			(this.OnMonthButtonClick = () => {
				this.IsSetBirth() ||
					(this.GetButton(10).OnPointDownCallBack.Unbind(),
					this.F4i(),
					(this.O4i = !0));
			}),
			(this.OnDayButtonClick = () => {
				this.IsSetBirth() ||
					(this.O4i &&
						(this.GetButton(11).OnPointDownCallBack.Unbind(),
						this.V4i(),
						(this.k4i = !0)));
			}),
			(this.CloseClick = () => {
				this.CloseMe();
			}),
			(this.H4i = (t, e, i) => (
				(t = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(
					t,
				)).BindOnSelected(this.j4i),
				t
			)),
			(this.j4i = (t) => {
				(this.w4i = t),
					this.GetText(6).SetText(String(t)),
					this.k4i &&
						(void 0 !== this.B4i &&
							(this.GetButton(5).SetSelfInteractive(!0),
							this.GetInteractionGroup(14).SetInteractable(!0),
							(this.B4i = 1),
							this.GetText(7).SetText(String(this.B4i))),
						this.V4i());
			}),
			(this.W4i = (t, e, i) => (
				(t = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(
					t,
				)).BindOnSelected(this.K4i),
				t
			)),
			(this.K4i = (t) => {
				(this.B4i = t),
					void 0 !== this.w4i &&
						(this.GetButton(5).SetSelfInteractive(!0),
						this.GetInteractionGroup(14).SetInteractable(!0)),
					this.GetText(7).SetText(String(t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIButtonComponent],
			[11, UE.UIButtonComponent],
			[12, UE.UIText],
			[13, UE.UIExtendToggle],
			[14, UE.UIInteractionGroup],
		]),
			(this.BtnBindInfo = [
				[4, this.OnLeftButtonClicked],
				[5, this.OnRightButtonClicked],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnBirthChange,
			this.m7t,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnBirthChange,
			this.m7t,
		);
	}
	IsSetBirth() {
		var t = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
		return !(!t || 0 === t);
	}
	OnStart() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "AcquireCancel"),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "AcquireConfirm");
		var t = this.GetText(6),
			e = (t.SetUIActive(!0), this.GetText(7)),
			i =
				(e.SetUIActive(!0),
				this.IsSetBirth()
					? ((n = ModelManager_1.ModelManager.PersonalModel.GetBirthday()),
						(i = Math.floor(n / 100)),
						(n %= 100),
						t.SetText(String(i)),
						e.SetText(String(n)),
						this.GetButton(5).SetSelfInteractive(!0),
						this.GetInteractionGroup(14).SetInteractable(!0),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(12),
							"BirthIsSetCanNotChange",
						))
					: (t.SetText("--"),
						e.SetText("--"),
						this.GetButton(5).SetSelfInteractive(!1),
						this.GetInteractionGroup(14).SetInteractable(!1),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(12),
							"SetBirthCanNotChange",
						)),
				this.GetButton(10).OnPointDownCallBack.Bind(this.OnMonthButtonClick),
				this.GetButton(11).OnPointDownCallBack.Bind(this.OnDayButtonClick),
				ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay()),
			n = i ? 1 : 0;
		this.GetExtendToggle(13)?.SetToggleState(n);
	}
	F4i() {
		var t = this.GetItem(0),
			e = this.GetItem(1),
			i =
				((this.P4i = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
				this.P4i.CreateItems(e.GetOwner(), 2, this.H4i, 1),
				[]);
		for (let t = 1; t <= 12; t++) i.push(t);
		this.P4i.ReloadView(i.length, i), e.SetUIActive(!1);
	}
	V4i() {
		var t = this.GetItem(2),
			e = this.GetItem(3),
			i =
				(this.x4i ||
					((this.x4i = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
					this.x4i.CreateItems(e.GetOwner(), 2, this.W4i, 1)),
				this.Q4i(this.w4i)),
			n = [];
		for (let t = 1; t <= i; t++) n.push(t);
		this.x4i.ReloadView(n.length, n), e.SetUIActive(!1);
	}
	Q4i(t) {
		if (2 === t) return this.N4i;
		var e = this.b4i.length;
		for (let i = 0; i < e; i++) if (this.b4i[i] === t) return this.q4i;
		return this.G4i;
	}
	OnTick(t) {
		super.OnTick(t);
	}
	OnAfterShow() {}
	OnBeforeHide() {
		var t = 1 === this.GetExtendToggle(13)?.GetToggleState();
		t !== ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay() &&
			PersonalController_1.PersonalController.SendBirthdayShowSetRequest(t);
	}
	OnBeforeDestroy() {
		this.P4i?.Clear(), this.x4i?.Clear();
	}
}
exports.PersonalBirthView = PersonalBirthView;
