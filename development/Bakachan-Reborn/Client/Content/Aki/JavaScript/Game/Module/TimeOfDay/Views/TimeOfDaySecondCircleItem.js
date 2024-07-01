"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDaySecondCircleItem = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
	TimeOfDayDefine_1 = require("../TimeOfDayDefine"),
	TimeOfDayModel_1 = require("../TimeOfDayModel"),
	ANIMAL_SCALE = 0.9,
	MIDDLE_TIME = 12,
	FULL_ANGLE = 360,
	ONE_HOUR_ANGLE = 30,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6,
	BORDER_ALPHA = 0.65,
	BORDER_RIGHT = 0.9,
	BORDER_LEFT = 0.1,
	BORDER_LEFT_HIDE = 0.04,
	BORDER_RIGHT_HIDE = 0.96,
	BORDER_MIDDLE = 0.5,
	STONE2_BORDER_LEFT = 0.3,
	STONE2_BORDER_RIGHT = 0.7;
class TimeOfDaySecondCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.osi = void 0),
			(this._it = Rotator_1.Rotator.Create()),
			(this.rsi = new UE.Vector(0.9, 0.9, 0.9)),
			(this.yTo = () => {});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UITexture],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[
					3,
					() => {
						this.yTo();
					},
				],
			]);
	}
	RefreshItem(t) {
		(this.CurrentShowItemIndex = t),
			(this.osi = this.Pe[t]),
			this.$8e(),
			this.Cni();
	}
	$8e() {
		var t;
		this.osi &&
			(this.GetText(2).SetText(this.osi.ShowName),
			(t = TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
				this.osi.SetTime,
			)),
			this.GetText(1).SetText(t));
	}
	Cni() {
		if (this.osi) {
			let i = this.osi.SetTime / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
			i > 12 && (i -= 12);
			var t = 360 - 30 * i,
				e = this.GetItem(0);
			(this._it.Yaw = t), e.SetUIRelativeRotation(this._it.ToUeRotator());
		}
	}
	SetData(t) {
		this.Pe = t;
	}
	OnMoveItem(t) {
		var e,
			i = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth(),
			o = this.GetRootItem(),
			s = ((i = (o.GetAnchorOffsetX() + i / 2) / i), o.RelativeScale3D);
		let r = 0,
			a = 0;
		i > 0.1 && i < 0.5
			? ((r = (i - 0.1) / 0.4), (a = MathUtils_1.MathUtils.Lerp(0.65, 1, r)))
			: i > 0.04 && i < 0.1
				? ((r = (i - 0.04) / (0.1 - 0.04)),
					(a = MathUtils_1.MathUtils.Lerp(0, 0.65, r)))
				: i <= 0.04 && (a = 0),
			i >= 0.5 && i < 0.9
				? ((r = (i - 0.5) / 0.4), (a = MathUtils_1.MathUtils.Lerp(1, 0.65, r)))
				: i >= 0.9 && i < 0.96
					? ((r = (i - 0.9) / (0.96 - 0.9)),
						(a = MathUtils_1.MathUtils.Lerp(0.65, 0, r)))
					: i >= 0.96 && (a = 0),
			this.GetItem(5).SetAlpha(a),
			(a =
				i > 0.3 && i < 0.5
					? ((r = (i - 0.3) / 0.2), MathUtils_1.MathUtils.Lerp(0, 1, r))
					: i >= 0.5 && i < 0.7
						? ((r = (i - 0.5) / (0.7 - 0.5)),
							MathUtils_1.MathUtils.Lerp(1, 0, r))
						: 0),
			this.GetTexture(4).SetAlpha(a),
			i >= 0.4 && i <= 0.6
				? i >= 0.4 && i <= 0.5
					? ((r = i - 0.4),
						(e = MathUtils_1.MathUtils.Lerp(0.9, 1, 10 * r)),
						(e = new UE.Vector(e, e, e)),
						o.SetUIItemScale(e))
					: ((r = i - 0.5),
						(e = MathUtils_1.MathUtils.Lerp(1, 0.9, 10 * r)),
						(i = new UE.Vector(e, e, e)),
						o.SetUIItemScale(i))
				: s.X !== this.rsi.X && o.SetUIItemScale(this.rsi);
	}
	OnUnSelect() {}
	OnSelect() {
		(ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
			this.osi),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
	}
}
exports.TimeOfDaySecondCircleItem = TimeOfDaySecondCircleItem;
