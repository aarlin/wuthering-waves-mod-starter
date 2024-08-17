"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestViewStep = void 0);
const ue_1 = require("ue"),
	TreeStepBase_1 = require("../../GeneralLogicTree/View/TreeStep/TreeStepBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	QuestViewChildStep_1 = require("./QuestViewChildStep");
class QuestViewStep extends TreeStepBase_1.TreeStepBase {
	constructor() {
		super(...arguments),
			(this.But = void 0),
			(this.but = []),
			(this.cno = new Map());
	}
	Dispose() {
		if ((super.Dispose(), this.but)) {
			for (const e of this.but) e.Dispose();
			this.but = void 0;
		}
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
			this.ComponentRegisterInfos.push([3, ue_1.UIItem]),
			this.ComponentRegisterInfos.push([4, ue_1.UIItem]);
	}
	OnStart() {
		super.OnStart(),
			this.GetItem(3)?.SetUIActive(!0),
			this.GetItem(4)?.SetUIActive(!0);
		var e = this.GetItem(2),
			t = new QuestViewChildStep_1.QuestViewChildStep();
		t.SetRootActor(e.GetOwner(), !0), this.but.push(t);
	}
	Update(e, t) {
		(this.But = t),
			this.But
				? (this.SetActive(!0),
					(t = this.UpdateData(e, this.But.MainTitle)),
					this.GetItem(3)?.SetUIActive(t),
					(e = this.qut()),
					this.GetItem(4)?.SetUIActive(t || e))
				: this.SetActive(!1);
	}
	qut() {
		const e = this.GetItem(2);
		if (!e) return !1;
		const t = this.But;
		if (!t || !t.SubTitles)
			return (
				this.but.forEach((e) => {
					e.SetActive(!1);
				}),
				!1
			);
		let i = 0,
			s = e.GetHierarchyIndex();
		return (
			this.cno.clear(),
			t.SubTitles.forEach((t) => {
				let u;
				var r;
				this.but.length > i
					? (u = this.but[i])
					: ((r = LguiUtil_1.LguiUtil.CopyItem(
							e,
							e.GetParentAsUIItem(),
						)).SetHierarchyIndex(++s),
						(u = new QuestViewChildStep_1.QuestViewChildStep()).SetRootActor(
							r.GetOwner(),
							!0,
						),
						this.but.push(u)),
					u.UpdateData(this.TreeIncId, t),
					this.cno.set(i, u.UpdateDescribeSuccess),
					i++;
			}),
			this.but.forEach((e, i) => {
				var s = i < t.SubTitles.length;
				i = this.cno.get(i) ?? !1;
				e.SetActive(s && i);
			}),
			!0
		);
	}
}
exports.QuestViewStep = QuestViewStep;
