"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicSupportController = void 0);
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../../../GlobalData"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletLogicController_1 = require("./BulletLogicController"),
	PROFILE_KEY = "BulletLogicSupportController_GetHitPointTransform",
	DRAW_TIME = 5;
class BulletLogicSupportController extends BulletLogicController_1.BulletLogicController {
	constructor(e, t) {
		super(e, t), (this.uoe = void 0), (this.Y9o = void 0), (this.J9o = void 0);
	}
	OnInit() {
		this.koe(),
			this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(
				this.LogicController.Camp,
			);
	}
	koe() {
		(this.Y9o = new UE.Transform()),
			(this.J9o = Vector_1.Vector.Create(0, 0, 0)),
			(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.bIsSingle = !0),
			(this.uoe.bIgnoreSelf = !0),
			this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Bullet),
			(this.uoe.DrawTime = 5),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearRed,
			);
	}
	BulletLogicAction(e) {
		var t = e.GetBulletInfo();
		t.AttackerCamp !== this.LogicController.Camp ||
			t.HasTag(this.LogicController.Tag) ||
			(t.AddTag(this.LogicController.Tag),
			ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(
				this.LogicController.Effect,
			) &&
				((e = this.z9o(e)),
				BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
					GlobalData_1.GlobalData.World,
					this.LogicController.Effect.ToAssetPathName(),
					e,
					this.Bullet.GetBulletInfo(),
					"[BulletLogicSupportController.BulletLogicAction] " + t.BulletRowName,
				)));
	}
	z9o(e) {
		var t = this.Bullet.GetComponent(152),
			o = e.GetComponent(152).Owner,
			r =
				((e = UE.KismetMathLibrary.TransformLocation(
					o.GetTransform(),
					e.Data.Base.CenterOffset.ToUeVector(),
				)),
				UE.KismetMathLibrary.TransformLocation(
					t.ActorTransform,
					this.Bullet.Data.Base.CenterOffset.ToUeVector(),
				));
		this.uoe || this.koe(),
			(this.uoe.WorldContextObject = o),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, e),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r);
		let l = this.Y9o;
		return (
			(e = TraceElementCommon_1.TraceElementCommon.LineTrace(
				this.uoe,
				PROFILE_KEY,
			)),
			(r = this.uoe.HitResult),
			e && r.bBlockingHit
				? (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
						r,
						0,
						this.J9o,
					),
					l.SetRotation(t.ActorRotation.Quaternion()),
					l.SetTranslation(this.J9o.ToUeVector()),
					l.SetScale3D(Vector_1.Vector.OneVector))
				: (l = o.GetTransform()),
			(this.uoe.WorldContextObject = void 0),
			l
		);
	}
}
exports.BulletLogicSupportController = BulletLogicSupportController;
