"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalMovePanel = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	SignalItem_1 = require("./SignalItem"),
	SignalLineItem_1 = require("./SignalLineItem");
class SignalMovePanel extends UiComponentsAction_1.UiComponentsAction {
	constructor() {
		super(...arguments),
			(this.xMo = void 0),
			(this.wMo = void 0),
			(this.BMo = void 0),
			(this.bMo = void 0),
			(this.Pxn = void 0),
			(this.unt = 0);
	}
	async Init(t, e) {
		t.SetAnchorOffsetY(0),
			await this.CreateThenShowByActorAsync(t.GetOwner()),
			this.InitByGameplayType(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		(this.wMo = this.GetItem(0)),
			(this.BMo = this.GetItem(1)),
			(this.bMo = this.GetItem(2)),
			(this.Pxn = this.GetItem(3)),
			this.qMo(),
			this.wMo.SetUIActive(!1),
			this.bMo.SetUIActive(!1),
			this.BMo.SetUIActive(!1),
			this.Pxn.SetUIActive(!1);
	}
	qMo() {
		var t = ModelManager_1.ModelManager.SignalDecodeModel,
			e = t.CurrentMorseCode,
			i = ((this.unt = t.Speed), t.StartDecisionSize),
			o = t.EndDecisionSize,
			n = 3 === t.CurrentGameplayType;
		this.xMo = [];
		for (let t = e.length - 1; 0 <= t; --t) {
			var s,
				a = e[t],
				r = Number(a) ?? 0;
			let I;
			switch (r) {
				case 1:
					var h = LguiUtil_1.LguiUtil.CopyItem(this.BMo, this.RootItem);
					(I = new SignalItem_1.SignalItem(r, i, o)).Init(h);
					break;
				case 2:
					(h = LguiUtil_1.LguiUtil.CopyItem(this.wMo, this.RootItem)),
						(I = new SignalItem_1.SignalItem(r, i, o)).Init(h);
					break;
				default:
					var l = LguiUtil_1.LguiUtil.CopyItem(this.bMo, this.RootItem);
					(I = new SignalLineItem_1.SignalLineItem(0, i, o)).Init(l);
			}
			0 === r &&
				n &&
				((a = LguiUtil_1.LguiUtil.CopyItem(this.Pxn, this.RootItem)),
				(s = new SignalLineItem_1.SignalLineItem(0, i, o)).Init(a),
				this.xMo.push(s)),
				this.xMo.push(I),
				0 !== t &&
					0 !== r &&
					((a = LguiUtil_1.LguiUtil.CopyItem(this.bMo, this.RootItem)),
					(s = new SignalLineItem_1.SignalLineItem(0, i, o)).Init(a),
					this.xMo.push(s));
		}
	}
	InitByGameplayType(t) {
		if (this.xMo) for (const e of this.xMo) e.InitByGameplayType(t);
	}
	StartAgain() {
		if (this.xMo) for (const t of this.xMo) t.Reset();
	}
	UpdateMove(t) {
		this.GMo(t), this.NMo();
	}
	GetCompleteness() {
		let t = 0,
			e = 0;
		for (const i of this.xMo)
			i instanceof SignalItem_1.SignalItem && ((e += i.GetCompleteness()), t++);
		return 0 === t ? 1 : e / t;
	}
	GetProgress() {
		let t = 0,
			e = 0;
		for (const i of this.xMo) (e += i.GetProgress()), t++;
		return 0 === t ? 1 : e / t;
	}
	GMo(t) {
		(t = this.RootItem.GetAnchorOffsetX() + (t / 1e3) * this.unt),
			this.RootItem.SetAnchorOffsetX(t);
	}
	NMo() {
		var t = this.RootItem.GetAnchorOffsetX();
		for (const i of this.xMo) {
			var e = t + i.GetRootItem().GetAnchorOffsetX();
			i.Update(e);
		}
	}
	OnCatchBtnDown() {
		for (const t of this.xMo) t.OnCatchBtnDown();
	}
	OnCatchBtnUp() {
		for (const t of this.xMo) t.OnCatchBtnUp();
	}
}
exports.SignalMovePanel = SignalMovePanel;
